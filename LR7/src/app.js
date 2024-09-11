const http = require("http");
const path = require("path");
const { staticFile, mimeTypes } = require("./models/m07-01");

const PORT = 3500;
const STATIC_DIR = path.join(__dirname, "../public/static");

http
  .createServer((req, res) => {
    if (req.method !== "GET") {
      res.statusCode = 405;
      res.end("405 Method Not Allowed");
      return;
    }

    const urlPath = req.url === "/" ? "/htmls/index.html" : req.url;
    const extname = path.extname(urlPath).toLowerCase();
    const filePath = path.join(STATIC_DIR, urlPath);

    if (extname in mimeTypes) {
      staticFile(res, filePath, extname);
    } else {
      res.statusCode = 404;
      res.end("404 Not Found");
    }
  })
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
