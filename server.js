const express = require("express");
const mysql = require("mysql2");
<<<<<<< HEAD
const cors = require("cors");

const app = express();
app.use(cors());
=======
<<<<<<< HEAD
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
>>>>>>> 20dcea8b759cc9e917826b5f032a04c6ccc64f4f

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
<<<<<<< HEAD
    database: "dashboard_db"
=======
    database: "student_db"
>>>>>>> 20dcea8b759cc9e917826b5f032a04c6ccc64f4f
});

db.connect(err => {
    if (err) {
<<<<<<< HEAD
        console.log("Connection failed:", err);
=======
        console.log("Database connection failed:", err);
>>>>>>> 20dcea8b759cc9e917826b5f032a04c6ccc64f4f
    } else {
        console.log("Connected to MySQL");
    }
});
<<<<<<< HEAD
app.get("/", (req, res) => {
    res.send("Server is working!");
});
/* -------------------------
   GET STUDENTS (SORT + FILTER)
-------------------------- */
app.get("/students", (req, res) => {

    let { sort, department } = req.query;

    let query = "SELECT * FROM students";

    if (department && department !== "") {
        query += ` WHERE department='${department}'`;
    }

    if (sort === "name") {
        query += " ORDER BY name ASC";
    } 
    else if (sort === "date") {
        query += " ORDER BY join_date ASC";
    }

    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

/* -------------------------
   COUNT PER DEPARTMENT
-------------------------- */
app.get("/department-count", (req, res) => {

    const query = `
        SELECT department, COUNT(*) AS total
        FROM students
        GROUP BY department
    `;

    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
=======

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
>>>>>>> 20dcea8b759cc9e917826b5f032a04c6ccc64f4f
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
<<<<<<< HEAD
=======
=======
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"123456",
database:"campus_events"
});

db.connect(err=>{
if(err){
console.log("Database connection failed");
}else{
console.log("Database connected");
}
});


/* Register Event */

app.post("/register",(req,res)=>{

const {name,email,vtu,dept,event} = req.body;

const sql = "INSERT INTO registrations (name,email,vtu_number,department,event_name) VALUES (?,?,?,?,?)";

db.query(sql,[name,email,vtu,dept,event],(err,result)=>{

if(err){
console.log(err);
res.send("Error occurred");
}
else{
res.redirect("/success.html?name="+name);
}

});

});


/* Get Events */

app.get("/events",(req,res)=>{
db.query("SELECT * FROM events",(err,result)=>{
if(err){
res.send(err);
}else{
res.json(result);
}
});
});

app.get("/registrations",(req,res)=>{

db.query("SELECT * FROM registrations",(err,result)=>{

if(err){
res.send("Error fetching data");
}else{
res.json(result);
}

});

});

app.get("/registrations",(req,res)=>{

db.query("SELECT * FROM registrations",(err,result)=>{
if(err){
res.send(err);
}else{
res.json(result);
}
});

});

app.listen(3000,()=>{
console.log("Server running http://localhost:3000");
>>>>>>> 02329470dacba7033b20fdef1a26114d4dbc8851
>>>>>>> 20dcea8b759cc9e917826b5f032a04c6ccc64f4f
});