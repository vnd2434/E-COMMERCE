const express = require('express') ;
const app = express()
// import Middleware
const errorMiddleware = require("./middleware/error")

app.use(express.json())

// imports Route
const product = require('./routes/productRouter');
const user=require('./routes/userRouter')

app.use('/api/v1/',product)
app.use('/api/v1',user)

// Middleware Fort Error
app.use(errorMiddleware)


module.exports = app