import React from "react";
import "./Home.css";
import Sidebar from "./Sidebar";
import PreviewMessages from "./PreviewMessages";
import Content from "./Content";
import { useState, useEffect } from "react";

function useAllUsers() {
  const [users, setUsers] = useState([]);
  const get = () => {
    return users;
  };

  return { get, setUsers };
}

function useCurrentSelectUser() {
  const [currSelectUser, setCurrSelectUser] = useState();
  const get = () => {
    return currSelectUser;
  };

  return { get, setCurrSelectUser };
}

const Home = ({ currLoggedInUser, socket, activeUsers }) => {
  const allUsers = useAllUsers();
  const currSelectUser = useCurrentSelectUser();

  useEffect(() => {
    // Listener for updateActiveUsers event
    socket.on("updateActiveUsers", (users) => {
      console.log("Updated active users: ", users);
      activeUsers.setActiveUsers(users);
    });

    // Clean up the listener on component unmount
    return () => {
      socket.off("updateActiveUsers");
    };
  }, []);

  return (
    <div className="homeMain">
      <Sidebar currLoggedInUser={currLoggedInUser} socket={socket} />
      <PreviewMessages
        socket={socket}
        allUserProp={allUsers}
        currSelectUser={currSelectUser}
        currLoggedInUser={currLoggedInUser}
        activeUsers={activeUsers}
      />
      <Content
        socket={socket}
        currSelectUser={currSelectUser}
        currLoggedInUser={currLoggedInUser}
        activeUsers={activeUsers}
      />
    </div>
  );
};

export default Home;
