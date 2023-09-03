const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:5250',
        methods: ['GET', 'POST'],
        credentials: true
    }
});
require('dotenv').config();

var port = process.env.PORT

app.get('/', (req, res) => {
    res.send(`Listening on port ${port} for socket connections`);
})

io.on('connect', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', (message) => {
        console.log('Received message: ', message.message);
        console.log('Received message sender: ', message.user);
        io.emit('message', message)
    })
    
    socket.on('message', (message) => {
        io.emit('broadcast', message)
    })
});

http.listen(port, () => {
    console.log(`Listening on port: ${port}...`)
})