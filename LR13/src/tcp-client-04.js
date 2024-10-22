const net = require('net')

const PORT = 8080
const HOST = '127.0.0.1'

const buf = Buffer.alloc(4)

const client = new net.Socket()


client.connect(PORT, HOST, () => {
    console.log('client working on :', client.remoteAddress + ':' + client.remotePort)
    let count = 0
    timerId = setInterval(() => {
        buf.writeInt32LE(count++, 0)
        client.write(buf)

    }, 1000)

    setTimeout(() => {
        clearInterval(timerId)
        client.end()
    }, 20000)
})

client.on("data", (data) => {
    console.log("data from server : ", data.readInt32LE())
})

client.on("close", () => {
    console.log("connection with server is close")
})

client.on("error", () => {
    console.log("")
})