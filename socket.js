const express = require('express');
const app = express();
const http = require('http').Server(app);
const { v4: uuidv4 } = require('uuid');
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

const chatRooms = {
    room1: {
        name: "Room 1",
        messages: [],
        users: []
    },
    room2: {
        name: "Room 2",
        messages: [],
        users: []
    }
}

const maxMsgHistory = 50;

io.on('connect', (socket) => {
    console.log('a user connected');
    console.log('socket id: ', socket.id)

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('joinRoom', (roomName) => {
        if (chatRooms[roomName]) {
            socket.join(roomName);
            chatRooms[roomName].users.push(socket.id);

            console.log(`user ${socket.id} just joined ${chatRooms[roomName].name}`);

            chatHistory = chatRooms[roomName].messages.slice(-maxMsgHistory);
            socket.emit('chatHistory', chatHistory);
        } else {
            console.log('Room does not exist: ', roomName);
        }
    })

    socket.on('leaveRoom', (roomName) => {
        if (chatRooms[roomName]) {
            socket.leave(roomName);
            chatRooms[roomName].users.filter((user) => user !== socket.id);
            
            console.log(`user ${socket.id} just left ${chatRooms[roomName].name}`);
        } else {
            console.log('Room does not exist: ', roomName);
        }
    })

    socket.on('message', (message) => {
        const { roomName } = message;
        const messageId = uuidv4();
        message['id'] = messageId;
        if (chatRooms[roomName]) {
            chatRooms[roomName].messages.push(message);
            io.to(roomName).emit('broadcast', message)
        }
    })
});

http.listen(port, () => {
    console.log(`Listening on port: ${port}...`)
})