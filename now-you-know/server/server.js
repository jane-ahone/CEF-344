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

//Login logic
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

//Inserting post into database
app.post("/posts", (req, res) => {
  console.log("Current user", getCurrentUser());
  if (getCurrentUser() == null) {
    return res.status(404).json({ error: "User is not logged in" });
  }
  const query =
    "INSERT INTO blogpost(userid,posttitle,postcontent) VALUES($1,$2,$3) RETURNING userid,postid,posttitle,postcontent";
  const values = [getCurrentUser().userid, req.body.title, req.body.content];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res
        .status(500)
        .json({ error: "Error sending blog data to the server" });
    }

    const queryname =
      "SELECT username FROM userinfo WHERE userinfo.userid = $1";
    const values = [result.rows[0].userid];

    db.query(queryname, values, (err, resultname) => {
      if (err) {
        console.error("Error executing query", err);
        return res
          .status(500)
          .json({ error: "Error getting username from the server" });
      }

      const newBlogPost = {
        userid: result.rows[0].userid,
        username: resultname.rows[0].username,
        posttitle: result.rows[0].posttitle,
        postcontent: result.rows[0].postcontent,
        postid: result.rows[0].postid,
        datetime: new Date(),
      };
      return res.status(200).json({ status: "success", data: newBlogPost });
    });
  });
});

//Display blog data
app.get("/blogdata", (req, res) => {
  const query =
    "SELECT blogpost.userid, username,postid, posttitle, postcontent, datetime FROM blogpost, userinfo WHERE blogpost.userid = userinfo.userid;";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res
        .status(500)
        .json({ error: "Error getting data from the server" });
    }

    return res.status(200).json({ status: "success", data: result.rows });
  });
});

app.put("/blogposts/:id", (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  const query =
    "UPDATE blogpost SET posttitle = $1, postcontent = $2 WHERE postid = $3";
  const values = [title, content, postId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res.status(500).json({ error: "Error updating blog post" });
    }

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Blog post updated successfully" });
  });
});

app.delete("/blogposts/:id", (req, res) => {
  const postId = req.params.id;
  const query = "DELETE FROM blogpost WHERE postid = $1";
  const values = [postId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res.status(500).json({ error: "Error deleting blog post" });
    }

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "Blog post deleted successfully" });
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
