const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)

//Using CORS policy
const cors = require("cors");
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

const bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

// Using Node.js `require()`FOR mongoDB
const mongoose = require('mongoose');
// configure mongoDB
const mongoDB = "mongodb://127.0.0.1:27017/MultiTicToe"
//connect local database 
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected...'))
    .catch(err => console.log('Error connecting database',err));

//To remove depreceate warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Room = require('./models/Room');
const Message = require('./models/Message');


//post request to join room
app.post('/join_room', jsonParser, async (req, res) => {
    console.log('req reciveed', req.body);

    //check if the room which this exist or not
    const room_id = req.body.room_id;
    const oyo_room = await Room.findOne({ uID: room_id })
        .catch((err) => {
            console.log('error occured while checking room',err)
        });

    console.log('room' ,oyo_room);
    flag = false;
    if (oyo_room) {
        // check if room has less than 2 user
        if (oyo_room.noOfUser < 2) {

            // increase no of user
            oyo_room.noOfUser++;
            const doc = await oyo_room.save();

            res.status(200).json({doc});
        } else {
            //Room is full
            res.status(200).json({ err: "Room is Full can't join " })
        }
    } else {
        res.status(200).json({ err: "Enter Valid Room ID"})
    }

})

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
    const room = new Room({ uID: result, noOfUser: 1 });
    room.save().then(() => {
        console.log('room created', result);
    }).catch((err) => {
        console.log('err creating room',err);
    })

    res.json(result);
})

//Sample Request
app.get("/", (req, res) => {
    res.send({ message: "We did it!" });
});

//Open Socket io Connection
io.on('connection', (socket) => {

    //incoming message from chat.js
    socket.on('sendMessage' , async ( { message , name , user_id , room_id } )=>{
        const msgToStore = {
            name,
            user_id,
            room_id,
            text: message
        }

        const oyo_room = await Room.findOne({ uID: room_id })
        .catch((err) => {
            console.log('error occured while checking room',err)
        });

        console.log(oyo_room._id);
        console.log('room u asked for',oyo_room);
        io.to(oyo_room._id).emit('messageReceived',msgToStore);

    })
})


//Start Up Server 
const PORT = process.env.PORT || 8000;
http.listen(PORT, () => {
    console.log('Backend Server listing at PORT:', PORT);
})