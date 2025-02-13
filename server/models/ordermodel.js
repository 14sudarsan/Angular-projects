const mongoose = require("mongoose")



const orderschema = new mongoose.Schema({  



    cartitems:Array,
    amount:String,
    status:String,
    address:String,

    phonenumber:String,

    email:String,
    admin:String,
    
   
    createdAt:Date

})
const ordermodel = mongoose.model('order',orderschema);
module.exports = ordermodel;