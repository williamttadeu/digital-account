const express = require("express");
let database = require("./database");
var cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json())

app.get("/", function(req,res) {
    res.send("Hello World");
});


//cRud
//return customer
app.get("/database",function(req, res){
    res.send(database);
});

app.get("/customerfind/:cpf", function(req,res){
    const customerFound = database.find(function(customer){
        return customer.cpf = req.params.cpf;
    });
    res.send(customerFound);
})

//cruD
//Delete customer
app.delete("/customer/delete/:cpf", (req,res)=>{
    database = database.filter(function(customer){
        return customer.cpf != req.params.cpf;
    })
    res.send(database);
})

//Crud
//Create customer
app.post("/customer/save",(req,res)=>{
    database.push({
        name: req.body.name,
        birthday:req.body.birthday,
        email:req.body.email,
        cpf:req.body.cpf,
    });
    res.send(database);
})

//crUd
//Update customer
app.patch("/customer/edit/:cpf",(req,res)=>{
    database = database.filter(function(customer){
        return customer.cpf != req.params.cpf;
    });
    database.push({
        name: req.body.name,
        birthday:req.body.birthday,
        email:req.body.email,
        cpf:req.body.cpf,
    });
    res.send(database);


})

app.listen(3000);
console.log("Server is running...");