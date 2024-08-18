const http = require("http")
const URL = 3500
http.createServer(function (reg, res) {

    console.log(reg.url())
    res.write("<h1>hello world<h1>")



    res.end("1")

}).listen(URL)