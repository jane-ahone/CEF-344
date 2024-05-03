import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { useContext } from "react";

const SignUp = () => {
  const { setLoggedIn } = useContext(AuthContext);

  const [values, setValues] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/", values)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          setLoggedIn(true);
          navigate("/main");
        } else {
          alert("Error");
        }
      })
      .then((err) => console.log(err));
  };
  return (
    <div className="SignUpMain">
      <img className="ellipse-icon" alt="" src="../../src/assets/ellipse.svg" />
      <img className="vector-icon" alt="" src="../../src/assets/vector.svg" />
      <h2>Sign Up </h2>
      <img
        className="group-icon"
        alt=""
        src="../../src/assets/weather-icon.svg"
      />
      <form className="form" onSubmit={handleSubmit}>
        <div className="username">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="user">
              <path
                id="Vector"
                d="M16.6667 17.5V15.8333C16.6667 14.9493 16.3155 14.1014 15.6903 13.4763C15.0652 12.8512 14.2174 12.5 13.3333 12.5H6.66666C5.78261 12.5 4.93476 12.8512 4.30964 13.4763C3.68452 14.1014 3.33333 14.9493 3.33333 15.8333V17.5"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_2"
                d="M10 9.16667C11.841 9.16667 13.3333 7.67428 13.3333 5.83333C13.3333 3.99238 11.841 2.5 10 2.5C8.15906 2.5 6.66667 3.99238 6.66667 5.83333C6.66667 7.67428 8.15906 9.16667 10 9.16667Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <input
            autoComplete="off"
            className="input-field"
            type="text"
            id="username"
            name="username"
            required
            minLength="4"
            size="20"
            placeholder="Username"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          ></input>
        </div>
        <div className="password">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="lock">
              <path
                id="Vector"
                d="M15.8333 9.16667H4.16667C3.24619 9.16667 2.5 9.91286 2.5 10.8333V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V10.8333C17.5 9.91286 16.7538 9.16667 15.8333 9.16667Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_2"
                d="M5.83333 9.16667V5.83333C5.83333 4.72827 6.27232 3.66846 7.05372 2.88706C7.83512 2.10565 8.89493 1.66667 9.99999 1.66667C11.1051 1.66667 12.1649 2.10565 12.9463 2.88706C13.7277 3.66846 14.1667 4.72827 14.1667 5.83333V9.16667"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>

          <input
            autoComplete="off"
            className="input-field"
            type="password"
            id="password"
            name="password"
            required
            minLength="4"
            size="20"
            placeholder="Password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          ></input>
        </div>
        <div className="login-btnn">
          <button className="login-btn">Create Account </button>
        </div>
        <div className="forgot-password">Forgot password?</div>
        <div className="forgot-password">
          <Link to={"/login"}> Login </Link>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
