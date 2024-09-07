const WebSocket = require("ws")

const ws = new WebSocket("ws:/localhost:4000/broadcast")

ws.on("open", () => {
    console.log("socket is open")
    ws.send("hello server")
})




ws.on("message", message => {
    console.log(`10-02-client: ${message}`)
})


ws.on("close", () => {
    console.log("WebSocket is close")
})