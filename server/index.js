const express = require('express');
const app = express();
const http = require('http').Server(app);

//Using CORS policy
const cors = require("cors");
app.use(cors());

//Port
const PORT = process.env.PORT || 8000;

app.get('/create_room', (req, res) => {

    //Create-room using js random
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u',
        'v', 'w', 'x', 'y', 'z'];

    let result = "";
    for (let index = 0; index < 5; index++) {
        result += alphabet[Math.floor(Math.random() * 10000) % 24];
    }
    res.send(result);
})

app.get("/", (req, res) => {
    res.send({ message: "We did it!" });
});

http.listen(PORT, () => {
    console.log('Backend Server listing at PORT:', PORT);
})