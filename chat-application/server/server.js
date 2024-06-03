const pg = require("pg");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const cors = require("cors");

//Db connections
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "ChatApp",
  password: "zaine",
  port: 5432,
});

db.connect();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Socket.IO server running");
});

let users = [];
let currRoom;
let roomUsers = [];
let activeUsers = [];

// Socket.IO connection handling

io.on("connection", (socket) => {
  console.log(`A client connected with id ${socket.id}  `);

  socket.on("disconnect", () => {
    console.log(`A client disconnected with id ${socket.id}`);

    // Remove user from activeUsers array
    activeUsers = activeUsers.filter((user) => user[5] !== socket.id);

    // Broadcast updated activeUsers list
    io.emit("updateActiveUsers", activeUsers);
  });

  socket.on("register", (username, email, password, callback) => {
    try {
      db.query(
        "INSERT INTO users (username, email, password, socket_id) VALUES ($1, $2, $3, $4) ON CONFLICT (username) DO UPDATE SET socket_id = EXCLUDED.socket_id RETURNING *;",
        [username, email, password, socket.id],
        (err, result) => {
          if (err) {
            console.error("Error inserting data:", err);
            return callback({ status: "Registration failed", error: err });
          }

          const loggedInUser = result.rows[0]; // Access the first row of the result
          activeUsers.push(Object.values(loggedInUser));

          console.log(`User registered: ${username}`);

          // Return the loggedInUser information via callback
          callback({
            status: "Registration succesful",
            user: Object.values(loggedInUser),
            onlineUsers: activeUsers,
          });

          // Optionally notify other clients
          socket.broadcast.emit("newUser", activeUsers);
        }
      );
    } catch (err) {
      console.error(err);
    }
    // callback({
    //   status: "Registration succesful",
    // });
  });

  let allUsers;

  socket.on("fetchmessages", (sender_id, receiver_id, callback) => {
    try {
      db.query(
        "SELECT sender_id, receiver_id, content, messages.created_at FROM messages, users WHERE sender_id = $1 AND receiver_id = $2 ORDER BY messages.created_at ASC",
        [sender_id, receiver_id],
        (err, result) => {
          if (err) {
            console.error("Error fetching data:", err);
          }
          allMessages = result.rows;
          console.log(allMessages);
          socket.emit("returnMessages", allMessages);
        }
      );
    } catch (err) {
      console.error(err);
    }
    callback({
      status: "Fetch Message succesful",
    });
  });

  socket.on("sendMessage", ({ sender, recipient, message }, callback) => {
    date = new Date();
    io.to(recipient).emit("receiveMessage", [sender, message, date]);
    callback({ status: "Message sent" });
  });

  socket.on("joinRoom", ({ username, selectedRoom }, callback) => {
    currRoom = selectedRoom;
    id = socket.id;
    const user = { id, username, selectedRoom };
    roomUsers.push(user);

    socket.join(selectedRoom);
    db.query(
      "INSERT INTO chat_rooms(name,room_name) VALUES($1,$2)",
      [username, selectedRoom],
      (err, result) => {
        if (err) {
          console.error("Error inserting data for create room function:", err);
        }
      }
    );
    console.log(
      `User ${username} with ${socket.id} joined room: ${selectedRoom}`
    );
    callback({
      status: "Joined room successfully",
      data: [username, selectedRoom],
    });
    socket.emit("infoMessage", `Welcome to ${selectedRoom}!`);

    // Broadcast when a user connects
    socket.broadcast
      .to(selectedRoom)
      .emit("infoMessage", `${username} has joined the chat`);

    // Runs when client disconnects
    socket.on("disconnect", () => {
      io.to(selectedRoom).emit("infoMessage", `${username} has left the chat`);
      db.query(
        "DELETE FROM chat_rooms WHERE name = $1",
        [username],
        (err, result) => {
          if (err) {
            console.error("Error deleting user from chatrooms:", err);
          }
        }
      );
    });
  });

  //Chat message
  socket.on("groupMessage", (userMessage) => {
    id = socket.id;
    const user = roomUsers.find((user) => user.id === id);
    date = new Date();
    io.to(user.selectedRoom).emit("message", [
      user.username,
      userMessage,
      date,
      ,
    ]);
  });
  //Chat message
  socket.on("getOnlineUsers", (callback) => {
    callback({
      status: "Fetch Message succesful",
      data: roomUsers,
    });
  });

  //   socket.on(
  //     "sendMessage",
  //     (sender_socket, receiver_socket, message, callback) => {
  //       try {
  //         io.to(receiver_socket).emit("receiveMessage", {
  //           sender_socket,
  //           message,
  //         });
  //         // db.query(
  //         //   "SELECT sender_id, receiver_id, content, messages.created_at FROM messages, users WHERE sender_id = $1 AND receiver_id = $2 ORDER BY messages.created_at ASC",
  //         //   [sender_id, receiver_id],
  //         //   (err, result) => {
  //         //     if (err) {
  //         //       console.error("Error fetching data:", err);
  //         //     }
  //         //     allMessages = result.rows;
  //         //     console.log(allMessages);
  //         //     socket.emit("returnMessages", allMessages);
  //         //   }
  //         // );
  //       } catch (err) {
  //         console.error(err);
  //       }
  //       callback({
  //         status: "Message succesfully sent",
  //       });
  //     }
  //   );
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = {
  currRoom,
  users,
};
