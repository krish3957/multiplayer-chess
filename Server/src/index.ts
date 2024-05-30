import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';
import { WebSocket } from 'ws';
import mongoose from 'mongoose';

const wss = new WebSocket.Server({ port: 8080 });

mongoose.connect('mongodb://localhost:27017/chess').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});


const gameManager = new GameManager();
wss.on('connection', function connection(ws) {
    gameManager.addUser(ws);
    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    ws.send('something');
});
