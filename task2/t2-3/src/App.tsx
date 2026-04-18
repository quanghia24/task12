import { useState, useEffect, useCallback } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import ToastMessage from "./components/ToastMessage";
import { User } from "./types";
import { API_URL } from "./constants";
import { BackendEndpoints } from "./contracts";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modifiedIds, setModifiedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleFetchUsers = async (query: string = ""): Promise<User[]> => {
    const url = query
      ? `${API_URL}${BackendEndpoints.USER_SERVICE}?name=${encodeURIComponent(query)}`
      : `${API_URL}${BackendEndpoints.USER_SERVICE}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  };

  const updateUsersBatch = async (updates: Partial<User>[]): Promise<any> => {
    const response = await fetch(`${API_URL}${BackendEndpoints.USER_SERVICE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update users");
    }

    return response.json();
  };

  // Debounced search logic could be added here, but for simplicity we'll use a direct effect
  const loadUsers = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const data = await handleFetchUsers(query);

      setUsers(data);
      setModifiedIds(new Set());
    } catch (error) {
      console.error(error);
      setMessage({ text: "Failed to load users", type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadUsers(searchQuery);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery, loadUsers]);

  const handleEdit = (id: string, field: keyof User, value: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === id ? { ...user, [field]: value } : user,
      ),
    );
    setModifiedIds((prev) => new Set(prev).add(id));
  };

  const handleUpdate = async () => {
    const updates = users.filter((u) => modifiedIds.has(u._id!));
    if (updates.length === 0) return;

    setIsLoading(true);
    try {
      await updateUsersBatch(updates);

      setMessage({ text: "Successfully updated users!", type: "success" });
      await loadUsers(searchQuery); // Refresh
    } catch (error: any) {
      setMessage({ text: error.message || "Update failed", type: "error" });
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="app-container">
      <div className="glass-panel">
        <div className="search-bar">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Filter by name or email..."
          />
        </div>

        {isLoading && (
          <div style={{ marginBottom: "10px", color: "#646cff" }}>
            Loading...
          </div>
        )}

        <UserTable
          users={users}
          onEdit={handleEdit}
          modifiedIds={modifiedIds}
        />

        <button
          className="button button-primary"
          onClick={handleUpdate}
          disabled={modifiedIds.size === 0 || isLoading}
        >
          {isLoading ? "Updating..." : `Click to update users`}
        </button>
      </div>

      <ToastMessage message={message} />
    </div>
  );
}

export default App;
