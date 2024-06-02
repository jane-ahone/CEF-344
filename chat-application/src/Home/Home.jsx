import React from "react";
import "./Home.css";
import Sidebar from "./Sidebar";
import PreviewMessages from "./PreviewMessages";
import Content from "./Content";
import { useState } from "react";

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

const Home = ({ currLoggedInUser, socket }) => {
  const allUsers = useAllUsers();
  const currSelectUser = useCurrentSelectUser();

  return (
    <div className="homeMain">
      <Sidebar currLoggedInUser={currLoggedInUser} />
      <PreviewMessages
        socket={socket}
        allUserProp={allUsers}
        currSelectUser={currSelectUser}
        currLoggedInUser={currLoggedInUser}
      />
      <Content
        socket={socket}
        currSelectUser={currSelectUser}
        currLoggedInUser={currLoggedInUser}
      />
    </div>
  );
};

export default Home;
