const express = require('express')
var cors = require('cors')
require('dotenv').config()

const customersRoutes = require("./routes/customersRoutes")
const connection = require('./models/connections')

const app = express()
app.use(cors())
app.use(express.json())

app.use("/customers",customersRoutes(app,connection));

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server is running at PORT ${PORT}`)
