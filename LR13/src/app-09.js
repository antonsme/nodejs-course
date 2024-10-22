const udp = require("dgram")


const PORT = 3000

const data = Buffer.from("Hello UPD client!")

let server = udp.createSocket("udp4")

server.on("error", (e) => {
    console.log("error", e)
    server.close()
})

server.on("message", (message, info) => {
    console.log(`message from client : ${message.toString()} , info-message : ${message.length}`)
    console.log(`info-address : ${info.address} , info-port : ${info.port}`)
    server.send(data, info.port, info.address, (e) => {
        if (e) console.log("error", e)
        else console.log("message is send")
    })
})

server.on("listening", () => {
    console.log(`port : `, server.address().port)
    console.log(`ip : `, server.address().address)
    console.log(`family : `, server.address().family)
})



server.on("close", () => {
    console.log("server is close")
})

server.bind(PORT)