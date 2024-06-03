import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Group.css";

const Group = ({ socket }) => {
  const location = useLocation();
  const user = location.state;

  const navigate = useNavigate();

  const [selectedRoom, setSelectedRoom] = useState("Chatterbox Crew");

  const handleChatClick = () => {
    const username = user[1];
    socket.emit("joinRoom", { username, selectedRoom }, (response) => {
      console.log(response);
      navigate("/groupChat", {
        state: selectedRoom,
      });
    });
  };

  return (
    <div className="groupMain">
      <div className="join-container">
        <header className="join-header">
          <h1>
            <i className="fas fa-smile"></i> Groups
          </h1>
        </header>
        <main className="join-main">
          <p>Username : {user[1]}</p>
          <div className="form-control">
            <label htmlFor="room">Room</label>
            <select
              name="room"
              id="room"
              value={selectedRoom} // Set the value of the select element to the state variable selectedRoom
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              <option value="Chatterbox Crew">Chatterbox Crew</option>
              <option value="The Gossip Gang">The Gossip Gang</option>
              <option value="Talk Tribe">Talk Tribe</option>
              <option value="The Banter Brigade">The Banter Brigade</option>
              <option value="The Meme Team">The Meme Team</option>
              <option value="Besties Forever">Besties Forever</option>
            </select>
          </div>
          <button type="submit" className="btn" onClick={handleChatClick}>
            <Link to={{ pathname: `/groupChat`, state: selectedRoom }}>
              Join Chat{" "}
            </Link>
          </button>
        </main>
      </div>
    </div>
  );
};

export default Group;
