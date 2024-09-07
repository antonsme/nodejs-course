const http = require("http")
const url = require("url")
const WebSocket = require("ws")

const { staticFile } = require("./models/staticFile")






const PORT = 3500
const WSPORT = 4000


http.createServer((req, res) => {


    const parsedUrl = url.parse(req.url, true)
    const method = req.method
    if (parsedUrl.pathname == "/start" && method == "GET") {
        staticFile(res, "/10-01.html", ".html")
    }

}).listen(PORT, () => {
    console.log("server is working")
})



const wsServer = new WebSocket.Server({ port: WSPORT, host: "localhost", path: "/wsserver" })




wsServer.on("connection", ws => {

    let k = 1
    let interval
    let lastMessage

    ws.on("message", message => {
        console.log(`10-01-client : ${message}`)
        lastMessage = message


        if (!interval)
            interval = setInterval(() => {
                ws.send(`${lastMessage} -> ${k}`)
                k++
            }, 5000)

    })
    ws.on('close', () => {
        console.log('WebSocket connection closed');
        clearInterval(interval)
    });
})


console.log(`wsserver host : ${wsServer.options.host} , wsserver port : ${wsServer.options.port} , wsserver path : ${wsServer.options.path}`)