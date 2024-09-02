const http = require("http")

const filename = "myFile.txt"

const url = `http://localhost:3500/getfile?filename=${filename}`
const urlObj = new URL(url)


const options = {
    hostname: urlObj.hostname,
    port: urlObj.port,
    path: urlObj.pathname + urlObj.search,
    method: "GET"
}

const req = http.request(options, (res) => {

    let data = ""

    res.on('data', (chunk) => {
        data += chunk;
    });


    res.on('end', () => {
        console.log('data :', data);
    });
})



req.on('error', (err) => {
    console.error('request error:', err.message);
});


req.end();