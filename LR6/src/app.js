const http = require("http");
const fs = require("fs");
const path = require("path");
const sendmail = require("sendmail");
const querystring = require("querystring");

const PORT = 3500;

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
};

const staticFile = (res, filePath, ext) => {
  res.setHeader("Content-Type", mimeTypes[ext]);
  fs.readFile("../public" + filePath, (error, data) => {
    if (error) {
      res.end();
    }
    res.end(data);
  });
};

const createEmailOptions = (from, to, subject, html) => ({
  from: from,
  to: to,
  subject: subject,
  html: `<h1>${html}</h1>`,
});

http
  .createServer((reg, res) => {
    if (reg.url == "/") {
      staticFile(res, "/htmls/sendMessage.html", ".html");
    } else if (reg.url == "/submit" && reg.method == "POST") {
      let body = "";

      reg.on("data", (data) => {
        body += data.toString();
      });

      reg.on("end", () => {
        const { from, to, subject, html } = querystring.parse(body);

        const emailOptions = createEmailOptions(from, to, subject, html);

        sendmail(emailOptions, (err, reply) => {
          console.log(err && err.stack);
          console.dir(reply);
        });

        const formatResponse = (from, to, subject, html) =>
          `От: ${from}\nКому: ${to}\nТема: ${subject}\nСообщение: ${html}`;

        res.end(formatResponse(from, to, subject, html));
      });
    } else {
      res.statusCode = 404;
      res.end("not found");
    }
  })
  .listen(PORT, () => {
    console.log(`server is working in port ${PORT}`);
  });
