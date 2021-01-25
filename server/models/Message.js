// Using Node.js `require()`
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    room_id:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }
},{timestamps:true})

const Message = mongoose.model('Message' , MessageSchema);
module.exports = Message;