import React from "react";

interface ToastMessageProps {
  message: {
    text: string;
    type: "success" | "error";
  } | null;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className={`toast toast-${message.type}`}>
      {message.type === "success" ? "✓ " : "⚠ "}
      {message.text}
    </div>
  );
};

export default ToastMessage;
