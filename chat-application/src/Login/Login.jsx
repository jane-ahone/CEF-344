import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ loggedInUser, loginState, socket, activeUsers }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPass] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validate email format
    if (!emailRegex.test(value)) {
      setError("Invalid email address");
    } else {
      setError("");
    }
  };

  const register = (event) => {
    event.preventDefault();

    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }

    socket.emit("register", username, email, password, (response) => {
      if (response.status === "Registration succesful") {
        loginState.setLoggedIn(true);
        loggedInUser.setLoggedInUser(response.user);
        activeUsers.setActiveUsers(response.onlineUsers);
        navigate("/home");
      } else {
        console.log("Registration failed.");
      }
    });
  };

  useEffect(() => {
    socket.on("newUser", (user) => {
      console.log("I heard");
      activeUsers.setActiveUsers(user);
    }),
      [];
  });

  return (
    <div className="login-main-parent">
      <div className="login-main">
        <p className="starter">Can't wait to get back?</p>
        <p className="choose-option-text">Fill in the fields below</p>
        <div id="rectangle1" className="rectangle1"></div>
        <input
          id="username"
          className="username"
          value={username}
          type="text"
          placeholder="John Doe"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="email"
          className="email"
          value={email}
          type="email"
          placeholder="abc@gmail.com"
          onChange={handleChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          id="userpassword"
          className="userpassword"
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <div className="login-btn" onClick={register}>
          <b className="login-btn-text">Login</b>
        </div>
      </div>
    </div>
  );
};

export default Login;
