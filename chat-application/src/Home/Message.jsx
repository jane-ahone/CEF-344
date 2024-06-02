import React from "react";
import "./Message.css";

const Message = () => {
  return (
    <div className="message-component">
      <img className="message-component-child" alt="" src="Frame 10.png" />
      <div className="frame-group">
        <div className="frame-container">
          <div className="full-name-here-parent">
            <div className="full-name-here">Elmer Laverty</div>
            <div className="m">12m</div>
          </div>
          <div className="enter-your-message">Haha oh man 🔥</div>
        </div>
        <div className="label-parent">
          <div className="label">
            <div className="messages">Question</div>
          </div>
          <div className="label1">
            <div className="messages">Help wanted</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
