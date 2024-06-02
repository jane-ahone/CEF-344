import React from "react";
import { Link } from "react-router-dom";

const Group = () => {
  return (
    <div className="groupMain">
      <div class="join-container">
        <header class="join-header">
          <h1>
            <i class="fas fa-smile"></i> Groups
          </h1>
        </header>
        <main class="join-main">
          <form action="chat.html">
            <div class="form-control">
              <label for="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username..."
                required
              />
            </div>
            <div class="form-control">
              <label for="room">Room</label>
              <select name="room" id="room">
                <option value="Chatterbox Crew">Chatterbox Crew</option>
                <option value="The Gossip Gang">The Gossip Gang</option>
                <option value="Talk Tribe">Talk Tribe</option>
                <option value="The Banter Brigade">The Banter Brigade</option>
                <option value="The Meme Team">The Meme Team</option>
                <option value="Besties Forever">Besties Forever</option>
              </select>
            </div>
            <button type="submit" class="btn">
              <Link to={`/groupChat`}>Join Chat </Link>
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Group;
