import React, { useEffect, useState, useRef } from "react";
import "../styles/Chat.css";
import { useSelector } from "react-redux";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

function Chat({selectedUser}) {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { access, user } = useSelector((state) => state.auth);
  const chatSocketRef = useRef(null);
  const chatWindowRef = useRef(null);


  useEffect(() => {
    if (selectedUser) {
      const chatSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/${selectedUser.id}/`,
        [access]
      );

      chatSocket.onopen = () => {
        console.log("WebSocket connection opened");
      };

      chatSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "past_messages") {
          setMessages(data.messages);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: data.sender,
              message: data.message,
              receiver: data.receiver,
            },
          ]);
        }
      };

      chatSocket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      chatSocket.onerror = (error) => {
        console.error("WebSocket error: ", error);
      };

      chatSocketRef.current = chatSocket;

      return () => {
        chatSocket.close();
      };
    }
  }, [selectedUser, access]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatSocketRef.current && currentMessage.trim() !== "") {
      chatSocketRef.current.send(
        JSON.stringify({
          message: currentMessage,
          receiver: selectedUser.username,
        })
      );

      setCurrentMessage("");
    }
  };

  return (
    <div className="container mt-5 pt-5 row mx-auto">
      <ChatWindow messages={messages} user={user} chatWindowRef={chatWindowRef}>
        <ChatInput
          handleSendMessage={handleSendMessage}
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
        />
      </ChatWindow>
    </div>
  );
}

export default Chat;
