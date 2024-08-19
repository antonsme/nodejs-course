const http = require("http");

//TODO: Для лучшей читаемости кода выносим в отдельную переменную
const serverPort = 3500;
const serverHost = "localhost";

http
  .createServer(function (request, response) {
    console.log("Server work");

    response.setHeader("Content-Type", "text/html; charset=utf-8");
    /*TODO: Ошибка в передаче заголовка
    У тебя была ошибка в setHeader—параметры должны быть в одном строковом значении,
    разделённые точкой с запятой. Это важно, чтобы сервер корректно передавал информацию о кодировке.*/
    response.write("<h1>Hello World</h1>");
    response.end();
  })
  .listen(serverPort, serverHost, () => {
    console.info(`Server started on http://${serverHost}:${serverPort}`);
    //TODO: удобная штука, выводит сразу в консоль сообщение о запуске сервера и ссылку на него
  });
//TODO: Лучше указывать сразу хост и порт на котором запускаешь

//TODO: Оптимизация запросов и кода - лучше использовать стрелочные функции (best practice)
// http.createServer((request, response) => {
//   console.log("Server work");

//   response.setHeader("Content-Type", "text/html; charset=utf-8");
//   response.write("<h1>Hello World</h1>");
//   response.end();
// });
