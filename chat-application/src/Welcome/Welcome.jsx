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
        <b className="agree-and-continue">
          {" "}
          <Link className="link" to={`login`}>
            Agree and Continue{" "}
          </Link>
        </b>
      </div>
    </div>
  );
};

export default Welcome;
