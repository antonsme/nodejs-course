const http = require("http")
const url = require("url")
const fs = require("fs")
const xml2js = require("xml2js")
const formidable = require('formidable');
const path = require("path")


const { staticFile, mimeTypes } = require("./models/staticFile");



const PORT = 3500
const directoryPath = "C:\\Users\\anton\\Desktop\\LR8\\static"



http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const method = req.method



    if (parsedUrl.pathname == "/socket" && method == "GET") {
        res.end(`client's ip : ${req.socket.remoteAddress} , client's port ${req.socket.localPort} , server's ip ${req.socket.localAddress} `)
    }

    else if (parsedUrl.pathname == "/parameters" && method == "GET") {
        const queryParams = parsedUrl.query
        const x = parseInt(queryParams.x)
        const y = parseInt(queryParams.y)
        if (isNaN(x) || isNaN(y)) {
            res.statusCode = 404
            res.end("bad parameters")
        } else {
            res.end(`status code : ${res.statusCode} , x : ${x} , y : ${y}`)
        }
    }

    else if (parsedUrl.pathname == "/parametersxyz" && method == "POST") {
        let body = ""
        req.on("data", data => {
            body += data.toString()
        })

        req.on("end", () => {
            const jsonObj = JSON.parse(body)
            if (jsonObj) {
                const { x, y, z } = jsonObj
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`x : ${x} , y : ${y} , z : ${z}`)
            }
        })
    }

    else if (parsedUrl.pathname == "/json" && method == "POST") {
        let body = ""
        req.on("data", data => {
            body += data.toString()
        })
        req.on("end", () => {
            const bodyObj = JSON.parse(body)
            const { __comment, x, y, s, m, o } = bodyObj
            if (bodyObj) {
                const responseObj = {
                    __comment: "Ответ.Лабораторная работа 8/10",
                    x_plus_y: x + y,
                    Concatination_s_o: s.concat(o.surname, o.name),
                    Length_m: m.length
                }
                res.end(JSON.stringify(responseObj))
            }
        })
    }

    else if (parsedUrl.pathname == "/xml" && method == "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            xml2js.parseString(body, (err, result) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end("not found");
                    return
                } else {
                    const xArray = result.request.x.map(xv => Number(xv.$.value))
                    const mArray = result.request.m.map(mv => mv.$.value)
                    let sumX = xArray.reduce((a, b) => a + b)
                    let concatM = mArray.reduce((a, b) => a.concat(b))
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(`<response id = ${33}><sum element = "x" result = "${sumX}"/> <concat element = "m" result = "${concatM}"/> </response>`)
                }
            })
        })
    }

    else if (parsedUrl.pathname == "/file" && method == "POST") {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('error of uplouding');
                return;
            }
            const uploadedFile = files.file;
            fs.readFile(uploadedFile[0].filepath, (err, data) => {
                if (err) {
                    console.log("can't read a file")
                    res.end("error of writing file")
                } else {
                    res.end(data)
                }
            })
        });
    }


    else if (parsedUrl.pathname == "/image" && method == "POST") {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('error of uplouding');
                return;
            }
            const uploadedFile = files.file;
            fs.readFile(uploadedFile[0].filepath, (err, data) => {
                if (err) {
                    console.log("can't read a file")
                    res.end("error of writing file")
                } else {
                    res.end(data)
                }
            })
        });
    }

    else if (parsedUrl.pathname == "/getfile" && method == "GET") {
        const queryParams = parsedUrl.query
        const filename = queryParams.filename
        const components = filename.split(".")
        const ext = "." + String(components[1])
        staticFile(res, filename, ext)
    }















}).listen(PORT, () => {
    console.log("server is working")
})