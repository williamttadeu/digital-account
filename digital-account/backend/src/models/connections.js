const mysql = require('mysql2/promise')
require('dotenv').config()

const credentials = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
}

console.log(credentials)

const connection = mysql.createPool(credentials)

module.exports = connection
