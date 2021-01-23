const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)

//Using CORS policy
const cors = require("cors");
app.use(cors());

// Using Node.js `require()`FOR mongoDB
const mongoose = require('mongoose');
// configure mongoDB
const mongoDB = "mongodb://127.0.0.1:27017/MultiTicToe"
//connect local database 
mongoose.connect(mongoDB , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('Database Connected...'))
    .catch(err=>console.log(err));

//To remove depreceate warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Room = require('./models/Room');

app.get('/create_room', (req, res) => {

    //Generating unique id for each room
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u',
        'v', 'w', 'x', 'y', 'z'];

    let result = "";
    for (let index = 0; index < 5; index++) {
        result += alphabet[Math.floor(Math.random() * 10000) % 25];
    }

    //Saving newly creted roomt to database
    const room = new Room({ uID:result , noOfUser: 0 });
    room.save().then(()=>{
        console.log('room created', result);
    }).catch((err)=>{
        console.log(err);
    })

    res.send(result);
})

//Sample Request
app.get("/", (req, res) => {
    res.send({ message: "We did it!" });
});

//Open Socket io Connection
io.on('connection' , (socket)=>{

    socket.on('join' , ({ name , user_id , room_id})=>{
        console.log(`${name} with user id ${user_id} created room ${room_id}`);
    })
}) 


//Start Up Server 
const PORT = process.env.PORT || 8000;
http.listen(PORT, () => {
    console.log('Backend Server listing at PORT:', PORT);
})