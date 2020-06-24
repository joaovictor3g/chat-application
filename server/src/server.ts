import express from 'express';
import socketio from 'socket.io';
import { createServer } from 'http';
import routes from './routes';

import usersController from './controllers/usersController';

interface Params {
    id: string,
    name: string,
    room: string
}

interface User {
    error: string,
    user: string
}

const { addUser, removeUser, getUser, getUsersInRoom } = usersController;

const PORT = process.env.PORT || 3333;

const app = express();
const server = createServer(app);
const io = socketio(server);

app.use(express.json());

io.on('connection', (socket) => {
    console.log('We have a new connection!!!');

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user?.name}, welcome to the room ${user?.room}` })
        socket.broadcast.to(user?.room).emit('message', { user: 'admin', text: `${user?.name}, has joined! ` })

        socket.join(user?.room);

        callback();
    }); 

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user?.room ).emit('message', { user: user?.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        console.log('User had left!!!')
    });
});

app.use(routes);

server.listen(PORT, () => {
    console.log(`>Server listening on port ${PORT}`)
});