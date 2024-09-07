const WebSocket = require("ws")


const PORT = 4000

const wsserver = new WebSocket.Server({ port: PORT, host: "localhost", path: "/wsserver" })


wsserver.on("connection", ws => {
    ws.on("message", message => {
        console.log(`your message : ${message}`)
        ws.send("message form ws-server")
    })

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });

})


console.log(`wsserver host : ${wsserver.options.host} , wsserver port : ${wsserver.options.port} , wsserver path : ${wsserver.options.path}`)