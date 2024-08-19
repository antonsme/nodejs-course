const http = require("http");
const URL = 3500;
/*TODO: Good practice, но URL используется для обозначения адреса или пути.
В этом случае, переменная URL хранит порт, так что лучше назвать её более понятно*/
http
  .createServer((reg, res) => {
    //TODO: Опечатка, должно быть req и res
    //TODO: Используем стрелочные функции
    //ERROR console.log(reg.url());
    //TODO: Метод console.log(reg.url()); вызовет ошибку, потому что reg.url — это свойство, а не метод
    console.log(reg.url); //CORRECT
    res.write("<h1>hello world<h1>"); //TODO: Неправильно написан закрывающий тег

    res.end("1");
  })
  .listen(URL); //TODO: Исправить по примеру из предыдущей лабораторной
