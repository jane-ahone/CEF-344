import { useState } from "react";
import "./App.css";
import Home from "./Home/Home";
import Login from "./Login/Login";

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
function useActiveUsers() {
  const [activeUsers, setActiveUsers] = useState([]);
  const get = () => {
    return activeUsers;
  };

  return { get, setActiveUsers };
}

function App({ socket }) {
  const loginState = useLoggedIn();
  const currloggedInUser = useLoggedInUsers();
  const activeUsers = useActiveUsers();

  return (
    <>
      {loginState.get() ? (
        <Home
          currLoggedInUser={currloggedInUser}
          socket={socket}
          activeUsers={activeUsers}
        />
      ) : (
        <Login
          loginState={loginState}
          loggedInUser={currloggedInUser}
          socket={socket}
          activeUsers={activeUsers}
        />
      )}
    </>
  );
}

export default App;
