
const mongoose = require('mongoose');

const amountSchema = mongoose.Schema({
    amount:{
        type:String,
        required:true
    }
    
},{timestamp:true})

const Amount = mongoose.model("Amount",amountSchema);
module.exports = Amount;

