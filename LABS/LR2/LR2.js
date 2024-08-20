const http = require("http")
const fs = require("fs")
const path = require("path")




const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.txt': 'text/plain',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'woff': 'application/font-woff',
    'woff2': 'application/font-woff2',
    'ttf': 'application/font-ttf',
    'eot': 'application/vnd.ms-fontobject',
    'otf': 'application/font-otf',
    'swf': 'application/x-shockwave-flash',
    'wasm': 'application/wasm'
}

const staticFile = (res, filePath, ext) => {
    res.setHeader("Content-Type", mimeTypes[ext])
    fs.readFile("./public" + filePath, (error, data) => {
        if (error) {
            res.end()
        }
        res.end(data)
    })
}


const getResponse = (res, ext, text) => {
    res.setHeader("Content-Type", `${mimeTypes[ext]}; charset=utf-8;`)
    res.write(text)
    res.end()
}





http.createServer(function (reg, res) {

    const url = reg.url

    switch (url) {
        case "/":
            getResponse(res, ".txt", "Main")
            break
        case "/html":
            staticFile(res, "/htmls/index.html", ".html")
            break
        case "/pic":
            staticFile(res, "/images/image1.png", ".png")
            break
        case "/api/name":
            getResponse(res, ".txt", "Шмелев Антон Алексеевич")
            break
        case "/xmlhttprequest":
            staticFile(res, "/htmls/xmlhttprequest.html", ".html")
            break
        case "/fetch":
            staticFile(res, "/htmls/fetch.html", ".html")
            break
        case "/jquery":
            staticFile(res, "/htmls/jquery.html", ".html")
            break
        default:
            const extname = String(path.extname(url)).toLowerCase()
            if (extname in mimeTypes) {
                staticFile(res, url, extname)
            } else {
                res.statusCode = 404
                res.end()
            }
            break
    }
}).listen(5000)