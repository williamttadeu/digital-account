const express = require("express");
let database = require("./database");
var cors = require("cors");

//Aqui estou "importando" os documentos?
const CustomersController = require('./customers/customers.controller')
const CustomersService = require('./customers/customers.service')
const CustomersRepository = require('./customers/customers.repository')

// Injeção de dependência = forma em que estamos vinculando as classes
const customersRepository = new CustomersRepository() // instanciar repository
const customersService = new CustomersService(customersRepository) // instanciar service
const customersController = new CustomersController(customersService) // instanciar controller

const app = express();
app.use(cors());
app.use(express.json())

app.get("/", function(req,res) {
    res.send("Hello World");
});


app.get("/database",function(req, res){
    res.send(database);
});

//cruD
//Delete customer
/*
app.delete("/customer/delete/:cpf", (req,res)=>{
    database = database.filter(function(customer){
        return customer.cpf != req.params.cpf;
    })
    res.send(database);
})
*/

app.delete("/customers/delete/:cpf", (req,res)=>{
    customersController.deleteCustomer(req, res)
})

//Crud
//Create customer
app.post(`/customers`, (req, res) => {
    customersController.createCustomer(req, res)
})

app.get(`/customers/:cpf`, (req, res) => {
    customersController.findCustomerByCPF(req, res)
})

//crUd
//Update customer

app.patch("/customer/edit/:cpf",(req,res)=>{
    customersController.updateCustomer(req, res)
});

/*
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
*/

const PORT = 3000
app.listen(PORT);
console.log(`Server is running at PORT ${PORT}`);