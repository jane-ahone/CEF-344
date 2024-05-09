import express from "express";
import pg from "pg";
import cors from "cors";
import { setCurrentUser, getCurrentUser, setExistingPost } from "./auth.js";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "UserAuth",
  password: "zaine",
  port: 5432,
});

db.connect();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/", (req, res) => {
  //Checking if that username exists
  const nameValues = [req.body.name];
  const sqlNameFind = "SELECT * FROM userInfo WHERE username = $1";

  db.query(sqlNameFind, nameValues, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res
        .status(500)
        .json({ error: "Error getting data from the server" });
    }

    // Include logic for result
    if (result.rows.length > 0) {
      return res
        .status(404)
        .json({ error: "Username has been taken. Enter again" });
    }
  });

  const sql =
    "INSERT INTO userinfo(username, userpassword) VALUES($1, $2) RETURNING userid";
  const values = [req.body.name, req.body.password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res
        .status(500)
        .json({ error: "Error inserting data in the server" });
    }
    const user = result.rows[0].userid;
    setCurrentUser(user);
    return res.status(200).json({ status: "success" });
  });
});

app.post("/login", (req, res) => {
  const query = "SELECT * FROM userInfo WHERE username = $1";
  const values = [req.body.name];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res
        .status(500)
        .json({ error: "Error getting data from the server" });
    }

    // Include logic for result
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add your authentication logic here
    if (result.rows[0].userpassword == req.body.password) {
      const user = result.rows[0];
      console.log(user);
      setCurrentUser(user);
      return res.status(200).json({ status: "success" });
    } else {
      console.log("Invalid credentials");
      return res.status(404).json({ error: "Invalid credentials" });
    }
  });
});

app.post("/posts", (req, res) => {
  if (getCurrentUser() == null) {
    console.log(getCurrentUser());
    return res.status(404).json({ error: "User is not logged in" });
  }
  const query =
    "INSERT INTO blogpost(userid,posttitle,postcontent) VALUES($1,$2,$3)";
  const values = [getCurrentUser().userid, req.body.title, req.body.content];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res
        .status(500)
        .json({ error: "Error getting data from the server" });
    }
    return res.status(200).json({ status: "success" });
  });
});

app.get("/blogdata", (req, res) => {
  const query =
    "SELECT username, posttitle, postcontent, datetime  FROM blogpost, userinfo WHERE blogpost.userid = userinfo.userid;";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res
        .status(500)
        .json({ error: "Error getting data from the server" });
    }
    setExistingPost(result);
    return res.status(200).json({ status: "success" });
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
