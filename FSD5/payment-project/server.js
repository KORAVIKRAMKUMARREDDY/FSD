const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"123456",
database:"payment_system"
});

db.connect(err=>{
if(err) throw err;
console.log("Database Connected");
});


app.get("/balance",(req,res)=>{

db.query("SELECT * FROM accounts",(err,result)=>{
res.json(result);
});

});


app.get("/transactions",(req,res)=>{

db.query("SELECT * FROM transactions",(err,result)=>{
res.json(result);
});

});


app.post("/pay",(req,res)=>{
const amount = Number(req.body.amount);

db.beginTransaction(err=>{

if(err) throw err;

db.query("SELECT balance FROM accounts WHERE name='User'",(err,result)=>{

const balance = result[0].balance;

if(balance < amount){

return db.rollback(()=>{
res.send("❌ Payment Failed: Insufficient Balance");
});

}

db.query(
"UPDATE accounts SET balance=balance-? WHERE name='User'",
[amount],
err=>{

if(err){

return db.rollback(()=>{
res.send("Transaction Failed");
});

}

db.query(
"UPDATE accounts SET balance=balance+? WHERE name='Merchant'",
[amount],
err=>{

if(err){

return db.rollback(()=>{
res.send("Transaction Failed");
});

}

db.query(
"INSERT INTO transactions(amount) VALUES(?)",
[amount],
err=>{

if(err){

return db.rollback(()=>{
res.send("Transaction Failed");
});

}

db.commit(err=>{

if(err){

return db.rollback(()=>{
res.send("Commit Failed");
});

}

res.send("✅ Payment Successful");

});

});

});

});

});

});

});



app.listen(3000,()=>{
console.log("Server running http://localhost:3000");
});