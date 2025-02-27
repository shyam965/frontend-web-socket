import React, { useState } from "react";
import Chat from "./components/Chat";


const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const joinChat = () => {
    if (username.trim() && room.trim()) {
      setJoined(true);
    }
  };

  return (
    <div>
      {!joined ? (
        <div>
          <h2>Join Chat</h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinChat}>Join</button>
        </div>
      ) : (
        <Chat username={username} room={room} />
      )}
    </div>
  );
};

export default App;
