const http = require("http")




const params = `<request id = "28">
                <x value = "8"/>
                <m value = "dog"/>
                </request>`
const url = `http://localhost:3500/xml`
const urlObj = new URL(url)




const options = {
    hostname: urlObj.hostname,
    port: urlObj.port,
    path: urlObj.pathname,
    method: "POST",
    headers: {
        'Content-Type': 'application/xml',
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