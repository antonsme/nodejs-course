const http = require("http")






http.createServer(function (reg, res) {



    let k = 3

    if (reg.url == `/fact?k=${k}`) {
        let b = factorial(k)
        res.end(`factoria ${k} = ${b}`)
    }




}).listen(5000)