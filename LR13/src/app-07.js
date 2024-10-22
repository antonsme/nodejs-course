const net = require('net')


const HOST = '127.0.0.1'
const PORTS = [30000, 40000]



PORTS.forEach((port) => {


    const server = net.createServer((socket) => {
        console.log("client working on port : ", port)

        let number = 0
        let buf = Buffer.alloc(4)


        socket.on('data', (data) => {
            console.log(`data from client: ${socket.remoteAddress} , ${socket.remotePort}`, data)
            number = data.readInt32LE()
        });

        setInterval(() => {
            buf.writeInt32LE(number, 0)
            socket.write(`Echo : ${buf}`)
        }, 5000)

        socket.on('close', () => {
            console.log('client is close:', socket.remoteAddress + ':' + socket.remotePort)
        });

        socket.on('error', (err) => {
            console.error('error of connection:', err.message)
        });
    });

    server.listen(port, HOST, () => {
        console.log(`TCP-server working on ${HOST}:${port}`)
    });

})