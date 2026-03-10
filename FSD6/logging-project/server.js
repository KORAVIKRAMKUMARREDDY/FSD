const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"123456",
database:"logging_system"
})

db.connect(err=>{
if(err) throw err
console.log("Database Connected")
})

app.post('/register',(req,res)=>{

const {name,email} = req.body

db.query(
"INSERT INTO students(name,email) VALUES (?,?)",
[name,email],
(err,result)=>{

if(err) throw err
res.send("Student Registered Successfully")

})

})

app.get('/activity',(req,res)=>{

db.query(
"SELECT * FROM daily_activity_report",
(err,result)=>{

if(err) throw err
res.json(result)

})

})

app.listen(3000,()=>{
console.log("Server running at http://localhost:3000")
})