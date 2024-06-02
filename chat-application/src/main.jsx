import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./Welcome/Welcome.jsx";
import Group from "./Groups/Group.jsx";
import GroupChat from "./Groups/GroupChat.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <App />,
  },

  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/group",
    element: <Group />,
  },
  {
    path: "/groupchat",
    element: <GroupChat />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
