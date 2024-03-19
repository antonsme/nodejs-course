const http = require('http')
http.createServer(function (request, response) {
    console.log('Server work')


    response.setHeader('Content-Type', 'text/html', 'charset=utf-8')
    response.write('<h1>Hello World</h1>')
    response.end()
}).listen(3500)
