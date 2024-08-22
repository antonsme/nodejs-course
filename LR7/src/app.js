const http = require("http")
const fs = require("fs")
const path = require("path")


const {staticFile , mimeTypes} = require("./models/m07-01")

const PORT = 3500



http.createServer((reg, res) => {

    const url = reg.url


    if (reg.url == "/" && reg.method == "GET") {
        staticFile(res, "/htmls/index.html", ".html")
    }
    else {
        const extname = String(path.extname(url)).toLowerCase()
        if (extname in mimeTypes) {
            staticFile(res, url, extname)
        } else {
            res.statusCode = 404
            res.end()
        }
    }


}).listen(PORT, () => {
    console.log(`server is working on ${PORT}`)
})


