



const http = require('http');
const readline = require('readline');

let appState = 'norm';

module.exports = appState


const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <html>
                <head>
                    <title>Состояние приложения</title>
                </head>
                <body>
                    <h1>${appState}</h1>
                </body>
            </html>
        `);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
    }
});


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const promptUser = () => {
    rl.question(`Введите новое состояние (norm, stop, test, idle) или 'exit' для выхода: `, (input) => {
        if (input === 'exit') {
            console.log('Завершение приложения...');
            rl.close();
            process.exit(0);
        } else if (['norm', 'stop', 'test', 'idle'].includes(input)) {
            appState = input;
            console.log(`Состояние изменено на: ${appState}`);
        } else {
            console.log(`Ошибка: некорректное состояние '${input}'`);
        }
        promptUser();
    });
};


const PORT = 5000;
server.listen(PORT, () => {
    promptUser(); 
});
