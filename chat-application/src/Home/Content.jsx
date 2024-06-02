import React, { useState } from "react";
import { useEffect } from "react";
import "./Content.css";

const Content = ({ currSelectUser, currLoggedInUser, socket }) => {
  const [message, setMessage] = useState();
  const [messageHistory, setMessageHistory] = useState();
  const [arrivalMessage, setArrivalMessage] = useState();

  const selectUser = currSelectUser.get();
  const user = currLoggedInUser.get();

  const handleClick = () => {
    console.log(
      "Sending from",
      user[1][1],
      user[5][1],
      "Receiving from",
      selectUser[0].username,
      selectUser[0].socket_id
    );
    socket.emit(
      "sendMessage",
      { sender: user[5][1], recipient: selectUser[0].socket_id, message },
      (response) => {
        console.log(response.status);
      }
    );
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("Received message:", data);
      setArrivalMessage(data);
    });

    // Cleanup the effect
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // useEffect(() => {
  //   socket.emit("fetchmessages", user[0][1], selectUser[0].id, (response) => {
  //     console.log(response.status);
  //   });

  //   socket.on("returnMessages", (messageHistory) => {
  //     setMessageHistory(messageHistory);
  //   });
  // }, [currSelectUser.get()]);

  return (
    <div className="contentMain">
      <div className="top-content">
        <div className="panel-header">
          <div className="user-content">
            <div className="top-content">
              <div className="florencio-dorrance">
                {selectUser ? selectUser[0].username : "Default"}
                <span className="frame-child"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="message-box">
        <div className="type-a-message">
          <input
            type="text"
            id="myInput"
            placeholder="Enter some text"
            onChange={(e) => setMessage(e.target.value)}
          />{" "}
          <button onClick={handleClick}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Content;
