const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "student_db"
});

db.connect(err => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

// Insert student
app.post("/register", (req, res) => {
    const { name, email, dob, department, phone } = req.body;

    const sql = "INSERT INTO students (name, email, dob, department, phone) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, email, dob, department, phone], (err, result) => {
        if (err) {
            res.status(500).send("Error inserting data");
        } else {
            res.send("Student Registered Successfully");
        }
    });
});

// Retrieve students
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, results) => {
        if (err) {
            res.status(500).send("Error fetching data");
        } else {
            res.json(results);
        }
    });
});
app.post("/register", (req, res) => {
  const { name, email, dob, department, phone } = req.body;

  const sql = "INSERT INTO students (name, email, dob, department, phone) VALUES (?, ?, ?, ?, ?)";

  connection.query(sql, [name, email, dob, department, phone], (err, result) => {
    if (err) {
      console.log(err);  // IMPORTANT
      return res.send("Error inserting data");
    }
    res.send("Registration successful");
  });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});