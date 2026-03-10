const express = require("express");
const mysql = require("mysql2");
<<<<<<< HEAD
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
});