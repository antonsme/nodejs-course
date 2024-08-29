const http = require("http")
const url = require("url")
const querystring = require('querystring');
const path = require("path")
const fs = require("fs")
const xml2js = require("xml2js")
const formidable = require('formidable');


// directoryPath  = require("./models/fileCounter")
const { staticFile, mimeTypes } = require("./models/staticFile");
const directoryPath = "C:\\Users\\anton\\Desktop\\LR8\\public\\static"
const pathToFilename = "C:\\Users\\anton\\Desktop\\LR8\\public\\static\\filename.txt"


const PORT = 3500

const stopServer = () => {
    server.close()
}


const server = http.createServer((reg, res) => {


    const parsedUrl = url.parse(reg.url, true)
    const method = reg.method
    const addParams = /^\/parameter\/(.+)\/(.+)$/;
    const match = parsedUrl.pathname.match(addParams)

    server.keepAliveTimeout = 5000

    if (parsedUrl.pathname == "/" && method == "GET") {
        staticFile(res, "/htmls/formParameter.html", ".html")
    }
    // 1
    else if (parsedUrl.pathname == "/connection" && method == "GET") {
        const set = parsedUrl.query.set
        if (set) {
            const newTime = parseInt(set, 10)
            server.keepAliveTimeout = newTime
            res.end(`${server.keepAliveTimeout} ms`)
        } else {
            res.end(`${server.keepAliveTimeout} ms`)
        }
    }


    // 2
    else if (parsedUrl.pathname == "/headers" && method == "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json",
            "My-Header": "my-header-something"
        });
        const regHeaders = reg.headers
        const resHeaders = res.getHeaders();
        res.end(JSON.stringify({
            regHeaders,
            resHeaders
        }, null, 2))
    }

    // 3
    else if (parsedUrl.pathname == "/parameter" && method == "GET") {
        const queryParams = parsedUrl.query
        console.log(queryParams)
        const x = parseInt(queryParams.x)
        const y = parseInt(queryParams.y)
        if (x && y && !isNaN(x && y)) {
            res.end(`sum : ${x + y} , diff : ${x - y} , work : ${x * y} , division : ${x / y}`)
        } else if (y == 0) {
            res.end("y is valid value")
        } else if (!isNaN(y || x)) {
            res.end("bad arguments")
        }
    }

    // 4
    else if (match && method == "GET") {
        const x = parseInt(match[1])
        const y = parseInt(match[2])
        if (x && y && !isNaN(x && y)) {
            res.end(`sum : ${x + y} , diff : ${x - y} , work : ${x * y} , division : ${x / y}`)
        } else if (y == 0) {
            res.end("y is valid value")
        } else {
            res.end(JSON.stringify(match))
        }
    }

    //5
    else if (parsedUrl.pathname == "/close" && method == "GET") {
        stopServer()
        staticFile(res, "/htmls/stopServer.html", ".html")
    }

    //6
    else if (parsedUrl.pathname == "/socket" && method == "GET") {
        res.end(`client's ip : ${reg.socket.remoteAddress} , client's port ${reg.socket.localPort} , server's ip ${reg.socket.localAddress} `)
    }

    //7


    //8
    else if (parsedUrl.pathname == "/resp-status" && method == "GET") {
        const code = parsedUrl.query.code
        const mess = parsedUrl.query.mess
        if (!isNaN(code) && code >= 100 && mess) {
            res.writeHead(code, { "Content-Type": "text/plain" })
            res.end(`status code : ${code} , status message : ${mess}`)
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    }

    //9
    else if (parsedUrl.pathname == "/formparameter" && method == "POST") {
        let body = ""
        reg.on("data", data => {
            body += data.toString()
        })
        reg.on("end", () => {
            const data = querystring.parse(body)
            const text = data.text
            const number = data.number
            const date = data.date
            res.end(`text : ${text} number : ${number} date : ${date}`)
        })
    }

    //10
    else if (parsedUrl.pathname == "/json" && method == "POST") {
        let body = ""
        reg.on("data", data => {
            body += data.toString()
        })
        reg.on("end", () => {
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

    //12
    else if (parsedUrl.pathname == "/xml" && method == "POST") {
        let body = "";
        reg.on("data", chunk => {
            body += chunk.toString();
        });
        reg.on("end", () => {
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
    //12
    else if (parsedUrl.pathname == '/files' && method === 'GET') {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('erro of reading folder:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'error of reading folder' }));
                return;
            }
            const fileCount = files.filter(file => fs.statSync(path.join(directoryPath, file)).isFile()).length;
            res.setHeader('X-static-files-count', fileCount);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'files in folder static', count: fileCount }));
        });
    }
    //13
    else if (parsedUrl.pathname == "/files/filename" && method == "GET") {
        fs.access(pathToFilename, fs.constants.F_OK, (err) => {
            if (err) {
                console.log("file is not found")
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end("not found a file , error 404")
            } else {
                res.writeHead(200, { 'Content-Type': 'application/octet-stream' })
                const readStream = fs.createReadStream(pathToFilename);
                readStream.pipe(res)
            }
        })
    }

    //14
    else if (parsedUrl.pathname == "/upload" && method == "GET") {
        staticFile(res, "/htmls/upload.html", ".html")
    }


    else if (parsedUrl.pathname == "/upload" && method == "POST") {

        const form = new formidable.IncomingForm();

        form.parse(reg, (err, fields, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('error of loading files');
                return;
            }
            const uploadedFile = files.file;
            const oldPath = uploadedFile[0].filepath
            // console.log(uploadedFile);
            console.log(oldPath)
            res.end("file is wrote")

            fs.rename(oldPath, directoryPath + `/${uploadedFile[0].originalFilename}`, (err) => {
                if (err) {
                    console.log("file is not writing")
                    res.end("error with writing file")
                } else {
                    res.end("file was wrote")
                }
            })
        })

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
