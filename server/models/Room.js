// Using Node.js `require()`
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    uID:{
        type:String,
        required:true,
        unique:[true,'room id must be unique']
    },
    noOfUser:{
        type:Number,
        required:true
    }
});

const Room = mongoose.model('Room' , RoomSchema);
module.exports = Room;