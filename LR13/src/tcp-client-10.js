const dgram = require('dgram')

const PORT = 3000

const client = dgram.createSocket('udp4')


const message = Buffer.from('Hello, UDP Server!')

client.connect(PORT, "localhost", () => {
    client.send(message, (e) => {
        if (e) {
            console.log("error", e)
            client.close()
        } else console.log("message is send")
    })
})


client.on('message', (msg, info) => {
    console.log(`message : ${msg.toString()} from ${info.address}:${info.port}`)
    client.close()
});

client.on('error', (err) => {
    console.error(`socket error: ${err}`)
    client.close()
});