import React from "react";
import { User } from "../types";

interface UserTableProps {
  users: User[];
  onEdit: (id: string, field: keyof User, value: string) => void;
  modifiedIds: Set<string>;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, modifiedIds }) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <input
                  type="text"
                  className={`inline-edit ${modifiedIds.has(user._id!) ? "modified" : ""}`}
                  value={user.username}
                  onChange={(e) => onEdit(user._id!, "username", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  className={`inline-edit ${modifiedIds.has(user._id!) ? "modified" : ""}`}
                  value={user.email}
                  onChange={(e) => onEdit(user._id!, "email", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  className={`inline-edit ${modifiedIds.has(user._id!) ? "modified" : ""}`}
                  value={user.birthdate ? user.birthdate.split('T')[0] : ''}
                  onChange={(e) => onEdit(user._id!, "birthdate", e.target.value)}
                />
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: "2rem" }}>
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
