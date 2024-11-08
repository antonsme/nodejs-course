const net = require('net')

const PORT = 8080;
const HOST = '127.0.0.1'

const client = new net.Socket()


client.connect(PORT, HOST, () => {
    console.log('client working on :', client.remoteAddress + ':' + client.remotePort)
    client.write("hello")
})

client.on("data", (data) => {
    console.log("data from server : ", data.toString())
    client.destroy()
})

client.on("close", () => {
    console.log("connection with server is close")
})

client.on("error", () => {
    console.log("")
})