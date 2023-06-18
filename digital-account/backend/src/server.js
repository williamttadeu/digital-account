const express = require('express')
let database = require('./database')
var cors = require('cors')
require('dotenv').config();
const connection = require('./models/connections');

//Aqui estou "importando" os documentos?
const CustomersController = require('./customers/customers.controller')
const CustomersService = require('./customers/customers.service')
const CustomersRepository = require('./customers/customers.repository')

// Injeção de dependência = forma em que estamos vinculando as classes
const customersRepository = new CustomersRepository(connection);
//const customersRepository = new CustomersRepository() // instanciar repository
const customersService = new CustomersService(customersRepository) // instanciar service
const customersController = new CustomersController(customersService) // instanciar controller

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/database', function (req, res) {
    res.send(database)
})

app.get('/customersdatabase', async (req, res) => {
    /*
    try {
      const query = 'SELECT * FROM personalInformation';
      const [rows, fields] = await connection.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Erro ao obter os usuários do banco de dados:', error);
      res.status(500).json({ error: 'Erro ao obter os usuários do banco de dados' });
    }
    */
   const [rows] = await connection.execute('SELECT * FROM personalInformation');
   res.json(rows);
  });

//CRUD
app.delete('/customers/:cpf', (req, res) => {
    customersController.deleteCustomer(req, res)
})

app.post(`/customers`, (req, res) => {
    customersController.createCustomer(req, res)
})

app.get(`/customers/:cpf`, (req, res) => {
    customersController.findCustomerByCPF(req, res)
})

app.patch('/customer/edit/:cpf', (req, res) => {
    customersController.updateCustomerByCPF(req, res)
})

//const PORT = 3000
const PORT = process.env.PORT;
app.listen(PORT)
console.log(`Server is running at PORT ${PORT}`)
