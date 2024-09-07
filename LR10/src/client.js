const WebSocket = require("ws")

let k = 0
const ws = new WebSocket("ws:/localhost:4000/wsserver")

ws.on("open", () => {
    console.log("socket is open")
    const interval = setInterval(() => {
        k++
        ws.send(k)
    }, 3000)

    setTimeout(() => {
        clearInterval(interval);
        ws.close();
    }, 25000);
})




ws.on("message", message => {
    console.log(`10-02-client: ${message}`)
})


ws.on("close", () => {
    console.log("WebSocket is close")
})






