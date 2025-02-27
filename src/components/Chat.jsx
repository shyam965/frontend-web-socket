import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000"); // Connect to Flask-SocketIO

const Chat = ({ username, room }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Join room when component mounts
    socket.emit("join", { username, room });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]); // Append new message
    });

    return () => {
      socket.emit("leave", { username, room });
      socket.off("message"); // Cleanup listener
    };
  }, [room]);

  useEffect(() => {
    // Fetch chat history from backend
    axios.get(`http://localhost:5000/chat-history/${room}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching chat history:", err));
  }, [room]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", { username, room, message });
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Room: {room}</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.username || "System"}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
