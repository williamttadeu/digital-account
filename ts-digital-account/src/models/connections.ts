import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const credentials: mysql.ConnectionOptions = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
};

console.log(credentials);
const connection = mysql.createPool(credentials);


export default connection;