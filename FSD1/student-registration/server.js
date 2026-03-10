const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "student_db"
});

db.connect(err => {
    if (err) {
        console.log("Database connection failed", err);
    } else {
        console.log("Connected to MySQL");
    }
});

app.post("/register", (req, res) => {

    const { name, email, dob, department, phone } = req.body;

    const sql = "INSERT INTO students (name,email,dob,department,phone) VALUES (?,?,?,?,?)";

    db.query(sql, [name, email, dob, department, phone], (err, result) => {

        if (err) throw err;

        res.send(`
            <h2>Student Registered Successfully</h2>
            <a href="/students.html">View Students</a>
        `);

    });

});

app.get("/students", (req, res) => {

    db.query("SELECT * FROM students", (err, results) => {

        if (err) throw err;

        let html = `
        <h2>Registered Students</h2>
        <table border="1">
        <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>DOB</th>
        <th>Department</th>
        <th>Phone</th>
        </tr>
        `;

        results.forEach(row => {
            html += `
            <tr>
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.email}</td>
            <td>${row.dob}</td>
            <td>${row.department}</td>
            <td>${row.phone}</td>
            </tr>
            `;
        });

        html += "</table>";

        res.send(html);

    });

});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});