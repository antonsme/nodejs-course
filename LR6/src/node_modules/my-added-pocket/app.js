const http = require("http")
const fs = require("fs")
const path = require("path")
const sendmail = require("sendmail")
const querystring = require('querystring');






const PORT = 3500

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
}

const staticFile = (res, filePath, ext) => {
    res.setHeader("Content-Type", mimeTypes[ext])
    fs.readFile("../public" + filePath, (error, data) => {
        if (error) {
            res.end()
        }
        res.end(data)
    })
}


const server = http.createServer((reg, res) => {
    if (reg.url == "/") {
        staticFile(res, "/htmls/sendMessage.html", ".html")
    }
    else if (reg.url == "/submit" && reg.method == "POST") {
        let body = ""
        reg.on("data", data => {
            body += data.toString()
        })
        reg.on("end", () => {
            const data = querystring.parse(body)
            const from = data.from
            const to = data.to
            const subject = data.subject
            const html = data.html
            sendmail({
                from: from,
                to: to,
                subject: subject,
                html: `<h1>${html}</h1>`
            }, (err, reply) => {
                console.log(err && err.stack);
                console.dir(reply);
            })
            res.end(`от : ${from} кому : ${to} тема : ${subject} html : ${html}`)
        })
    }


    else {
        res.end("not found")
    }
}).listen(PORT, () => {
    console.log(`server is working in port ${PORT}`)
})