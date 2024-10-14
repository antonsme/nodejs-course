const WebSocket = require('ws');

const url = 'ws://localhost:3000';
const socket = new WebSocket(url);


socket.on('open', () => {
    console.log('connection is working.');

    socket.send('client is connected');
});

socket.on('message', (data) => {
    const message = JSON.parse(data);
    console.log(JSON.stringify(message, null, 2));
});


socket.on('close', () => {
    console.log('connection is close');
});

socket.on('error', (error) => {
    console.error(`Error: ${error.message}`);
});