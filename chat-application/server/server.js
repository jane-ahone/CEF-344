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

let users = {};

// Socket.IO connection handling

io.on("connection", (socket) => {
  console.log(`A client connected with id ${socket.id}  `);
  socket.on("disconnect", (socket) => {
    console.log(`A client disconnected with id ${socket.id}  `);
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
          console.log(loggedInUser);
          users[username] = socket.id;
          socket.username = username;
          console.log(`User registered: ${username}`);

          // Return the loggedInUser information via callback
          callback({
            status: "Registration succesful",
            user: Object.entries(loggedInUser),
          });

          // Optionally notify other clients
          // socket.broadcast.emit('userRegistered', loggedInUser);
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

  socket.on("fetchusers", (callback) => {
    try {
      db.query("SELECT id, username, socket_id FROM users;", (err, result) => {
        if (err) {
          console.error("Error fetching data:", err);
        }
        allUsers = result.rows;
        socket.emit("returnUsers", allUsers);
      });

      // Send message history to the client
    } catch (err) {
      console.error(err);
    }
    callback({
      status: "Fetch succesful",
    });
  });

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
    console.log(sender, "\n", recipient, "\n", message);
    io.to(recipient).emit("receiveMessage", {
      sender,
      message,
    });
    callback({ status: "Message sent" });
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
