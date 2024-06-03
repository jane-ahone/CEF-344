import React, { useState } from "react";
import { useEffect } from "react";
import "./Content.css";

const Content = ({ currSelectUser, currLoggedInUser, socket }) => {
  const [message, setMessage] = useState([]);
  const [messageHistory, setMessageHistory] = useState();
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const [sentMessage, setSentMessage] = useState([]);

  const selectUser = currSelectUser.get();
  const user = currLoggedInUser.get();

  const handleClick = () => {
    socket.emit(
      "sendMessage",
      { sender: user[1], recipient: selectUser[0][5], message },
      (response) => {
        console.log(response.status);
      }
    );
    const aboutSentMessage = ["Sent-Message", message];
    setArrivalMessage((prevMessages) => [...prevMessages, aboutSentMessage]);
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("Received message:", data);
      setArrivalMessage((prevMessages) => [...prevMessages, data]);
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
        <div className="user-content">
          <div className="florencio-dorrance">
            {selectUser ? selectUser[0][1] : "Default"}
          </div>
        </div>
      </div>
      <div className="message-box">
        <div className="message-list">
          {arrivalMessage.map((messageArray, outerIndex) => (
            <>
              {messageArray[0] == "Sent-Message" ? (
                <p key={outerIndex} className="message-item">
                  {" "}
                  {messageArray[1]}{" "}
                </p>
              ) : (
                <p
                  key={outerIndex}
                  className="message-item"
                  style={{ alignSelf: "end" }}
                >
                  {messageArray[1]}{" "}
                </p>
              )}
            </>
          ))}
        </div>
      </div>
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
  );
};

export default Content;
