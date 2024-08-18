const http = require("http")
const DB = require("./public/js/bd")
const { json } = require("stream/consumers")
const url = require("url")
const db = require("./public/js/bd")
const fs = require("fs")
const path = require("path")


const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
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



const server = http.createServer((reg, res) => {

    const parsedUrl = url.parse(reg.url, true)
    const method = reg.method


    if (parsedUrl.pathname == "/") {
        staticFile(res, "/htmls/main.html", ".html")
    }


    else if (parsedUrl.pathname == "/api/db" && method == "GET") {
        res.end(JSON.stringify(DB.select()))
    }


    else if (parsedUrl.pathname == "/api/db" && method == "POST") {
        let body = ""
        reg.on("data", chunk => {
            body += chunk.toString()
        })
        reg.on("end", () => {
            const responseObj = JSON.parse(body)
            const { id, name, bday } = responseObj
            if (body) {
                const newInfo = { id, name, bday }
                DB.insert(newInfo)
                res.end(JSON.stringify(newInfo))
            }
            else {
                res.end("данные неверные")
            }
        })
    }


    else if (parsedUrl.pathname == "/api/db" && method == "DELETE") {
        const id = parsedUrl.query.id
        if (id) {
            res.end(JSON.stringify(DB.show(id)))
            DB.delete(id)
        }
    }


    else if (parsedUrl.pathname == "/api/db" && method == "PUT") {
        const id = parsedUrl.query.id
        let changedIndex = id
        if (id) {
            let body = ""
            reg.on("data", chunk => {
                body += chunk.toString()
            })
            reg.on("end", () => {
                const updatedObj = JSON.parse(body)
                const { id, name, bday } = updatedObj
                if (body) {
                    const updatedInfo = { id, name, bday }
                    DB.update(changedIndex, updatedInfo)
                    res.end(JSON.stringify(updatedInfo))
                }
                else {
                    res.end("данные неверные")
                }
            })
        }
    }
    else {
        res.end("not found")
    }
}).listen(3500, () => {
    console.log("localhost is working on 3500")
})