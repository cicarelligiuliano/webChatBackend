//socket.js
const app = require('./server');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const chat = require('./db');
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Usuario conectado con id ' + socket.id);

    socket.emit('chat', chat.getChat());

    let userName = '';
    socket.on('login', (user) => {
        userName = user;
        socket.broadcast.emit('newUser', user);
    });

    socket.on('newMessage', ({ user, message, date }) => {
        const lastMessage = chat.addMessage({ user, message, date });
        io.emit('addMessage', lastMessage);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
        socket.broadcast.emit('userLeave', userName);
    });
});

module.exports = server;
