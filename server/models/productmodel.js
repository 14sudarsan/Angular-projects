const mongoose = require('mongoose')


const productschema = new mongoose.Schema({
    email:String,
    name:String,
    price:String,
    description:String,
    ratings:String,
    images:[
        {
            image:String,
        }
    ],
    category:String,
    seller:String,
    stock:String,
    numofReviews:String,
    createdAt:Date

})

const productmodel = mongoose.model('product',productschema);

module.exports = productmodel;