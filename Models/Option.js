const mongoose = require('mongoose');

const optSchema = new mongoose.Schema({
    option_num :{
        type:Number,
        required:true
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question',
        required:true
    },
    content:{
        type:String,
    },
    votes:{
        type:Number
    },
    link:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


module.exports = mongoose.model('Option',optSchema);