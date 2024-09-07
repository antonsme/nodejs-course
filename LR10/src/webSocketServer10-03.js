const WebSocket = require("ws")



const WSPORT = 4000
const wsServer = new WebSocket.Server({ port: WSPORT, host: "localhost", path: "/broadcast" })




wsServer.on("connection", ws => {


    ws.on("message", message => {
        console.log(`10-01-client : ${message}`)
        wsServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send("hello all clients from server")
            }

        })



    })
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
})


console.log(`wsserver host : ${wsServer.options.host} , wsserver port : ${wsServer.options.port} , wsserver path : ${wsServer.options.path}`)