const http = require("http")
const url = require("url")
const fs = require("fs")

const { staticFile } = require("./models/staticFile")





const PORT = 3500





http.createServer((req, res) => {


    const parsedUrl = url.parse(req.url, true)
    const method = req.method


    if (parsedUrl.pathname == "/" && method == "GET") {
        staticFile(res, "/10-01.html", ".html")
    }

}).listen(PORT, () => {
    console.log("server is working")
})