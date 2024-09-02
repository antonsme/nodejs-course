const http = require('http');
const fs = require('fs');
const FormData = require('form-data');
const path = require("path")


const form = new FormData();
const filePath = path.join(__dirname, 'static', 'MyFile.txt');
form.append('file', fs.createReadStream(filePath));

const options = {
    method: 'POST',
    host: 'localhost',
    port: 3500,
    path: '/file',
    headers: form.getHeaders()
};

const req = http.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
        responseData += chunk.toString();
    });

    res.on('end', () => {
        console.log('data :', responseData);
    });
});

req.on('error', (err) => {
    console.error('error :', err.message);
});

form.pipe(req);