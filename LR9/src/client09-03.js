const http = require("http")
const querystring = require('querystring');


const params = JSON.stringify({ x: 3, y: 6, z: 9 })
const url = `http://localhost:3500/parametersxyz`
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