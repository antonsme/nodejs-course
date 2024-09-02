const http = require("http")



const params = JSON.stringify({ __comment: "Лабораторная работа 8/10", x: 1, y: 2, s: "Сообщение", m: ["a", "b", "c", "d"], o: { surname: "Шмелев", name: "Антон" } })
const url = `http://localhost:3500/json`
const urlObj = new URL(url)


const options = {
    hostname: urlObj.hostname,
    port: urlObj.port,
    path: urlObj.pathname,
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(params)
    }
}


const req = http.request(options, (res) => {

    let data = ""

    res.on('data', (chunk) => {
        data += chunk.toString();
    });


    res.on('end', () => {
        console.log('data :', data);
    });
})



req.on('error', (err) => {
    console.error('request error:', err.message);
});


req.write(params)

req.end();