const express = require('express') ;
const app = express()
// import Middleware
const errorMiddleware = require("./middleware/error")
const  cookieParser = require('cookie-parser')

app.use(express.json())

app.use(cookieParser())

// imports Route
const product = require('./routes/productRouter');
const user=require('./routes/userRouter')
const order = require('./routes/orderRouter')

app.use('/api/v1/',product)
app.use('/api/v1',user)
app.use('/api/v1',order)


// Middleware Fort Error
app.use(errorMiddleware)

                
module.exports = app