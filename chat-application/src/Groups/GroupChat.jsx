import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GroupChat = ({ socket }) => {
  const [userMessage, setUserMessage] = useState("");
  const [incomingInfoMsg, setIncomingInfoMsg] = useState([]);
  const [incomingMsg, setIncomingMsg] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const location = useLocation();
  const room = location.state;

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("getOnlineUsers", (response) => {
      console.log(response);
      response.data.map((user, index) =>
        setOnlineUsers([...onlineUsers, user.username])
      );
    });
  }, [incomingInfoMsg]);

  useEffect(() => {
    socket.on("infoMessage", (message) => {
      console.log(message);
      setIncomingInfoMsg([...incomingInfoMsg, message]);
    });
    socket.on("message", (message) => {
      console.log(message);
      setIncomingMsg([...incomingMsg, message]);
    });
  });

  const handleSendClick = () => {
    // Emit userMessage to serverd
    socket.emit("groupMessage", userMessage);
  };
  const handleLeaveClick = () => {
    navigate("/home");
  };
  console.log(onlineUsers);

  return (
    <div className="groupChatMain">
      <div className="chat-container">
        <header className="chat-header">
          <h1>
            <i className="fas fa-smile"></i> Chatify
          </h1>
          <p onClick={handleLeaveClick} className="btn">
            Leave Room
          </p>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3>
              <i className="fas fa-comments"></i> Room Name:
            </h3>
            <h2 id="room-name">{room}</h2>
            <h3>
              <i className="fas fa-users"></i> Users
            </h3>
            <ul id="users">
              {onlineUsers.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>

          <div className="chat-messages">
            <div>
              {/* Iterate over the incomingMsg array */}
              {incomingInfoMsg.map((msg, index) => (
                <div key={index} className="message">
                  <p className="text"> {msg}</p>
                </div>
              ))}
            </div>
            <div>
              {/* Iterate over the incomingMsg array */}
              {incomingMsg.map((msg, index) => (
                <div key={index} className="message">
                  <p className="meta">
                    {msg[0]} <span>{msg[2]}</span>
                  </p>
                  <p className="text"> {msg[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
        <div className="chat-form-container">
          <input
            id="msg"
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Enter Message"
            required
            autoComplete="off"
          />
          <button className="btn" onClick={handleSendClick}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
