import React from "react";

function ChatWindow({ messages, user, chatWindowRef, children }) {
  return (
    <div className="col-8 p-3 bg-white shadow-sm rounded">
      <div className="chat-window rounded" ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${
              msg.sender === user.username ? "sent" : "received"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}

export default ChatWindow;
