const net = require('net')


const PORT = 8080
const HOST = '127.0.0.1'

const server = net.createServer((socket) => {
    console.log('client working on :', socket.remoteAddress + ':' + socket.remotePort)


    socket.on('data', (data) => {
        console.log('data from client:', data.toString())


        socket.write('ECHO: ' + data.toString())
    });

    socket.on('close', () => {
        console.log('client is close:', socket.remoteAddress + ':' + socket.remotePort)
    });

    socket.on('error', (err) => {
        console.error('error of connection:', err.message)
    });
});

server.listen(PORT, HOST, () => {
    console.log(`TCP-server working on ${HOST}:${PORT}`)
});


server.on('error', (err) => {
    console.error('error of server:', err.message)
});