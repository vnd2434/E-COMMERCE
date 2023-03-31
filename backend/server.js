const app = require('./app');
const dotenv = require('dotenv')
const connectdatabase = require('./config/database')

// config 
dotenv.config({path:"backend/config/config.env"});

//connect to databsse 
connectdatabase()


app.listen(process.env.PORT, () =>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})