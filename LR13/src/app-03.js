const net = require('net')


const PORT = 8080;
const HOST = '127.0.0.1'

let sum = 0

const server = net.createServer((socket) => {
    console.log('client working on :', socket.remoteAddress + ':' + socket.remotePort)

    let buf = Buffer.alloc(4)

    socket.on('data', (data) => {
        console.log('data from client:', data, sum)

        sum += data.readInt32LE()

    });

    setInterval(() => {
        buf.writeInt32LE(sum, 0)
        socket.write(buf)
    }, 5000)

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