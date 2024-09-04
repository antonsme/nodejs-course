const WebSocket = require("ws")


const ws = new WebSocket("ws:/localhost:4000/wsserver")

ws.on("open", () => {
    ws.send("hello from client.js")
})


ws.on("message", message => {
    console.log(`your message from server : ${message}`)
})


ws.on("close", () => {
    console.log("WebSocket is close")
})






