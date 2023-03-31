const mongoose =require('mongoose')

const connectdatabase =()=>{mongoose.connect(process.env.DB_URI,{useNewUrlParser: true,useUnifiedTopology: false }).then((data)=>{
    
        console.log();
        
        }).catch((err)=>{
                console.log(err);
        });
}

module.exports = connectdatabase