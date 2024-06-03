import React, { useEffect } from "react";
import "./Welcome.css";
import myImage from "../assets/Hello-cuate.svg";
import { Outlet, Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcome-main">
      <img className="welcome-illustration" alt="" src={myImage} />

      <b className="welcome-to-chatify">Welcome to Chatify</b>

      <p>
        Read our Privacy Policy. Tap “Agree and Continue” to accept Terms of
        Services{" "}
      </p>

      <div className="rectangle-parent">
        <Link className="link" to={`login`}>
          <b className="agree-and-continue"> Agree and Continue </b>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
