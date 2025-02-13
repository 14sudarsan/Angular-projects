const mongoose = require('mongoose');



const connectdatabase=()=>{

    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Mongo connected ")
    })

    
}

module.exports=connectdatabase;