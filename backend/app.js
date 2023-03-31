const express = require('express') ;
const app = express()
// import Middleware
const errorMiddleware = require("./middleware/error")

app.use(express.json())

// imports Route
const product = require('./routes/productRouter');

app.use('/api/v1/',product)


// Middleware Fort Error
app.use(errorMiddleware)


module.exports = app