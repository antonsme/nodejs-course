const fs = require("fs");
const path = require("path");

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".xml": "application/xml",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".txt": "text/plain",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".woff": "application/font-woff",
  ".woff2": "application/font-woff2",
  ".ttf": "application/font-ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "application/font-otf",
  ".swf": "application/x-shockwave-flash",
  ".wasm": "application/wasm",
};

const staticFile = (res, filePath, ext) => {
  res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.statusCode = 404;
      res.end("404 Not Found");
    } else {
      res.end(data);
    }
  });
};

module.exports = {
  staticFile,
  mimeTypes,
};
