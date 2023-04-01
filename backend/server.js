const app = require('./app');
const dotenv = require('dotenv')
const connectdatabase = require('./config/database')

// handling uncaught Excetion
process.on("uncaughtException", (err) =>{
    console.log(`Error : ${err.message}`);

    console.log("shutting Down the server due to  uncaught Excetion ");

    process.exit(1)
}) 

// config 
dotenv.config({path:"backend/config/config.env"});

//connect to databsse 
connectdatabase()


app.listen(process.env.PORT, () =>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})


// unhandle Promise Rejection if config crah 

process.on("unhandledRejection" ,(err) =>{
    console.log(`Error : ${err.message}`);
    console.log("shutting Down the server due to unhandle promise rejection ")

    server.close(()=>{
        process.exit(1)
    })
});

