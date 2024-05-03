import express from "express";
import pg from "pg";
import cors from "cors";

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
  const sql = "INSERT INTO userinfo(username, userpassword) VALUES($1, $2)";
  const values = [req.body.name, req.body.password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res
        .status(500)
        .json({ error: "Error inserting data in the server" });
    }
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

    console.log(result.rows[1].userpassword);

    // Include logic for result
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add your authentication logic here
    if (result.rows[1].userpassword == req.body.password) {
      return res.status(200).json({ status: "success" });
    } else {
      console.log("Invalid credentials");
      return res.status(404).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({ status: "success" });
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
