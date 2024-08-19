const http = require('http');


function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}


const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);


    if (url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Факториал</title>
                <script>
                    async function fetchFactorials() {
                        const startTime = Date.now();
                        for (let x = 1; x <= 20; x++) {
                            const response = await fetch(\`http://localhost:5000/fact?k=\${x}\`);
                            const fac = await response.text();
                            const elapsedTime = Date.now() - startTime;
                            document.body.innerHTML += \`<p>\${elapsedTime} ms - \${x} / \${fac}</p>\`;
                        }
                        const totalTime = Date.now() - startTime;
                        document.body.innerHTML += \`<p>Общее время: \${totalTime} ms</p>\`;
                    }
                    window.onload = fetchFactorials;
                </script>
            </head>
            <body>
                <h1>Запросы на факториал</h1>
            </body>
            </html>
        `);
    }
    else if (url.pathname === '/fact') {
        const k = parseInt(url.searchParams.get('k'), 10);
        if (!isNaN(k) && k >= 0) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(factorial(k).toString());
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Неверный параметр k');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});


const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});