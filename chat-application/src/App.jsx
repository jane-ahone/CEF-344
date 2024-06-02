import { useState } from "react";
import "./App.css";
import Home from "./Home/Home";
import Login from "./Login/Login";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log(`You connected with id: ${socket.id}`);
});

socket.on("disconnect", () => {
  console.log(`You disconnected with id: ${socket.id}`);
});

function useLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(false);
  const get = () => {
    return loggedIn;
  };

  return { get, setLoggedIn };
}
function useLoggedInUsers() {
  const [loggedInUser, setLoggedInUser] = useState();
  const get = () => {
    return loggedInUser;
  };

  return { get, setLoggedInUser };
}

function App() {
  const loginState = useLoggedIn();
  const currloggedInUser = useLoggedInUsers();

  return (
    <>
      {loginState.get() ? (
        <Home currLoggedInUser={currloggedInUser} socket={socket} />
      ) : (
        <Login
          loginState={loginState}
          loggedInUser={currloggedInUser}
          socket={socket}
        />
      )}
    </>
  );
}

export default App;
