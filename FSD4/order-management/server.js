const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.static('public'));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "order_management"
});

db.connect(err => {
    if(err){
        console.log("Database connection failed",err);
    } else{
        console.log("Database Connected");
    }
});

app.get('/orders',(req,res)=>{

let query = `
SELECT 
c.name,
p.product_name,
o.quantity,
p.price,
(o.quantity * p.price) AS total_price,
o.order_date
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN products p ON o.product_id = p.product_id
ORDER BY o.order_date DESC
`;

db.query(query,(err,result)=>{
    if(err) throw err;
    res.json(result);
});

});

app.listen(3000,()=>{
console.log("Server running at http://localhost:3000");
});