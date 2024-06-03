import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./Welcome/Welcome.jsx";
import Group from "./Groups/Group.jsx";
import GroupChat from "./Groups/GroupChat.jsx";

import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
socket.on("connect", () => {
  console.log(`You connected with id: ${socket.id}`);
});

socket.on("disconnect", () => {
  console.log(`You disconnected with id: ${socket.id}`);
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <App socket={socket} />,
  },

  {
    path: "/home",
    element: <App socket={socket} />,
  },
  {
    path: "/group",
    element: <Group socket={socket} />,
  },
  {
    path: "/groupchat",
    element: <GroupChat socket={socket} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
