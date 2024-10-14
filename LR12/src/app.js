const http = require("http")
const url = require("url")
const WebSocket = require('ws');

const fs = require("fs")
const path = require("path");
const { error } = require("console");




const PORT = 3000
const STUDENT_LIST_FILE = path.join(__dirname, "StudentList.json")

const DIRECTORY_PATH = __dirname


const loadStudents = () => {
    if (!fs.existsSync(STUDENT_LIST_FILE)) {
        sendMessageClients({ error: 1, message: `ошибка чтения файла ${STUDENT_LIST_FILE}` })
        return []
    };

    const data = fs.readFileSync(STUDENT_LIST_FILE);
    return JSON.parse(data);
}

const saveStudentList = (students) => {
    fs.writeFile(STUDENT_LIST_FILE, JSON.stringify(students), "utf8", (err) => {
        if (err) console.log(`error of reading file ${err}`)
        else console.log("data save successfully")
    })
}

const createCopyFile = (students) => {
    const COPY_STUDENT_LIST_FILE = path.join(__dirname, Date.now() + "_" + "StudentList.json")
    setTimeout(() => {
        fs.writeFile(COPY_STUDENT_LIST_FILE, JSON.stringify(students), "utf8", (err) => {
            if (err) console.log(`error of reading file ${err}`)
            else {
                sendMessageClients({ file: COPY_STUDENT_LIST_FILE })
                console.log("data save successfully")
            }
        })
    }, 2000)

}

const sendMessageClients = (message) => {
    wSS.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}


const readSLFiles = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(DIRECTORY_PATH, (err, files) => {
            if (err) {
                reject("error of reading directory")
            }
            if (files) {
                const StudentListFiles = files.filter(file => file.includes("StudentList.json") && file.length > 16)
                sendMessageClients(StudentListFiles)
                resolve(StudentListFiles)
            }
        })
    })
}

const delSLFiles = (fileList, date) => {
    fileList.forEach(file => {
        const nameFileArr = file.split("_")
        const dateFileStr = nameFileArr[0]
        const dateNumb = Number(dateFileStr)
        if (date < dateNumb) {
            fs.unlink(path.join(__dirname, file), (err) => {
                if (err) {
                    console.log("error of deleting file")
                } else {
                    console.log("files are deleted")
                }
            })
        }
    });
}



const requestHandler = (req, res) => {


    const parsedUrl = url.parse(req.url, true)
    const method = req.method
    const addParamsId = /^\/(\d+)$/;

    const matchId = parsedUrl.pathname.match(addParamsId)
    const matchB = parsedUrl.pathname.match(/^\/backup\/(\d+)$/);



    if (method == "GET" && parsedUrl.pathname == "/") {
        const students = loadStudents()
        res.writeHead(200, { "Content-Type": "application/json" });
        sendMessageClients(students)
        res.end(JSON.stringify(students))
    }


    else if (method == "GET" && matchId) {

        const students = loadStudents()
        const n = parseInt(matchId[1])

        const filteredStudents = students.filter(st => st.id == n)
        // const fStudent = students.find(st => st.id == n)

        if (filteredStudents.length > 0) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(filteredStudents))
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: 2, message: `cтудент с id равным ${n} не найден` }))
        }

    }

    else if (method == "PUT" && parsedUrl.pathname == "/") {
        const students = loadStudents()
        let body = ""
        req.on("data", chunk => {
            body += chunk.toString()
        })
        console.log(body)

        req.on("end", () => {
            const bodyObj = JSON.parse(body)
            const { id, name } = bodyObj

            if (bodyObj) {

                const newStudent = {
                    id: id,
                    name: name
                }
                const fStudent = students.find(st => st.id == id)
                if (fStudent) {
                    const reforgeStudents = students.map(st => st.id == id ? newStudent : st)
                    saveStudentList(reforgeStudents)
                    sendMessageClients(reforgeStudents)
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(newStudent))
                }
                else {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: 2, message: `cтудент с id равным ${id} не найден` }))
                }
            }
        })
    }
    else if (method == "POST" && parsedUrl.pathname == "/") {
        const students = loadStudents()
        let body = ""
        req.on("data", chunk => {
            body += chunk.toString()
        })
        console.log(body)
        req.on("end", () => {

            const bodyObj = JSON.parse(body)
            const { id, name } = bodyObj

            if (bodyObj) {
                const newStudent = {
                    id: id,
                    name: name
                }
                const fStudent = students.find(st => st.id == id)
                if (fStudent) {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: 3, message: `cтудент с id равным ${id} уже есть` }))
                }
                else {
                    console.log(newStudent)
                    students.push(newStudent)
                    saveStudentList(students)
                    sendMessageClients(newStudent)
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(newStudent))
                }
            }
        })
    }

    else if (method == "DELETE" && matchId) {
        const students = loadStudents()
        const n = parseInt(matchId[1])
        const fStudent = students.find(st => st.id == n)
        sendMessageClients(fStudent)
        const filteredStudents = students.filter(st => st.id != n)
        saveStudentList(filteredStudents)
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(filteredStudents))
    }

    else if (method == "POST" && parsedUrl.pathname == "/backup") {
        const students = loadStudents()
        createCopyFile(students)
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("created new StudentList file")
    }

    else if (method == "DELETE" && matchB) {
        const date = Number(matchB[1])
        console.log(date)
        readSLFiles().then(data => delSLFiles(data, date))
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("deleted")
    }


    else if (method == "GET" && parsedUrl.pathname == "/backup") {
        readSLFiles().then(
            data => res.end(JSON.stringify(data)))
    }


    else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end("not found")
    }



}


const server = http.createServer(requestHandler)

const wSS = new WebSocket.Server({ server })

wSS.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});


server.listen(PORT, () => {
    console.log(`server is working at port ${PORT}`)
})





