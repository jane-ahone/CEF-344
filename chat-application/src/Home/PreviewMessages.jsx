import React, { useState, useEffect } from "react";
import "./PreviewMessages.css";

const PreviewMessages = ({
  allUserProp,
  currSelectUser,
  currLoggedInUser,
  socket,
}) => {
  const handleCurrSelectUser = (event) => {
    const currUserInfo = allUserProp
      .get()
      .filter((user) => user.username == event.target.innerText);
    currSelectUser.setCurrSelectUser(currUserInfo);
  };

  useEffect(() => {
    socket.emit("fetchusers", (response) => {
      console.log(response.status);
    });

    socket.on("returnUsers", (user) => {
      allUserProp.setUsers(user);
    });
  }, []);

  return (
    <>
      <div className="previewMessagesMain">
        <div className="header">
          <p className="messages">Messages</p>
        </div>
        <div className="pMMusers">
          {allUserProp.get().map((user, index) => (
            <p
              key={index}
              id="index"
              className="username"
              onClick={handleCurrSelectUser}
            >
              {user.username}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default PreviewMessages;
