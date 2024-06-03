import React, { useState, useEffect } from "react";
import "./PreviewMessages.css";

const PreviewMessages = ({
  allUserProp,
  currSelectUser,
  currLoggedInUser,
  socket,
  activeUsers,
}) => {
  const handleCurrSelectUser = (event) => {
    const currUserInfo = activeUsers.get().filter((user) => {
      return user[1].trim() === event.target.innerText.trim();
    });
    currSelectUser.setCurrSelectUser(currUserInfo);
  };

  return (
    <>
      <div className="previewMessagesMain">
        <div className="header">
          <p className="messages">Chats</p>
        </div>
        <div className="pMMusers">
          {activeUsers.get().map((user, index) => (
            <div key={index} className=" class">
              <span className="circle-user"></span>
              <p
                key={index}
                id="index"
                className="username"
                onClick={handleCurrSelectUser}
              >
                {user[1]}
                {currLoggedInUser.get()[1].trim() == user[1].trim() ? (
                  <span>(Me)</span>
                ) : null}
                <span className="frame-child"></span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PreviewMessages;
