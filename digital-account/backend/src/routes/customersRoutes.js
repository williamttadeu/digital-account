const express = require("express");

module.exports = function(app, connection) {
    const router = express.Router();
    // Required classes
    const CustomersController = require('../customers/customers.controller');
    const CustomersService = require('../customers/customers.service');
    const CustomersRepository = require('../customers/customers.repository');
  
    // Dependency injection
    const customersRepository = new CustomersRepository(connection);
    const customersService = new CustomersService(customersRepository);
    const customersController = new CustomersController(customersService);
  

    router.get('/hello', function (req, res) {
        res.send('Hello World');
      });
    
    router.get('/database', async (req, res) => {
    const query = 'SELECT * FROM personal_info';
    const [rows, fields] = await connection.query(query);
    res.json(rows);
    });

    router.get('/:cpf', (req, res) => {
        customersController.findCustomerByCPF(req, res);
    });

    router.delete('/:cpf', (req, res) => {
    customersController.deleteCustomer(req, res);
    });

    router.post('', (req, res) => {
    customersController.createCustomer(req, res);
    });

    router.patch('/edit/:cpf', (req, res) => {
    customersController.updateCustomerByCPF(req, res);
    });

    return router
  };