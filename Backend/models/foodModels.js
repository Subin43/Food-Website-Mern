const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    s_No:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    restaurant:{
        type:String,
        required:true
    },
    offer:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    img:{
       type:String,
       required:true
    }
    
},{timestamp:true})

const Food = mongoose.model("Food",foodSchema);
module.exports = Food;

