loadBalance();
loadTransactions();

function loadBalance(){

fetch("/balance")
.then(res=>res.json())
.then(data=>{

document.getElementById("user").innerHTML=data[0].balance;
document.getElementById("merchant").innerHTML=data[1].balance;

});

}


function loadTransactions(){

fetch("/transactions")
.then(res=>res.json())
.then(data=>{

let rows="";

data.forEach(t=>{

rows+=`
<tr>
<td>${t.id}</td>
<td>${t.amount}</td>
<td>${t.date}</td>
</tr>
`;

});

document.getElementById("table").innerHTML=rows;

});

}



function pay(){

const amount=document.getElementById("amount").value;

fetch("/pay",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({amount:amount})

})

.then(res=>res.text())
.then(data=>{

document.getElementById("msg").innerHTML=data;

loadBalance();
loadTransactions();

});

}