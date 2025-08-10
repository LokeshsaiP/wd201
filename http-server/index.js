import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let homeContent = "";
let projectContent = "";
let registrationContent = "";

const args = process.argv;
const port = parseInt(args[2] || "3000");

fs.readFile(path.join(__dirname, "home.html"), (err, home) => {
  if (err) throw err;
  homeContent = home;
});
fs.readFile(path.join(__dirname, "project.html"), (err, project) => {
  if (err) throw err;
  projectContent = project;
});
fs.readFile(path.join(__dirname, "registration.html"), (err, registration) => {
  if (err) throw err;
  registrationContent = registration;
});

http
  .createServer((request, response) => {
    const url = request.url;

    if (url.match(/\.(css|js|ico)$/)) {
      const filePath = path.join(__dirname, url);
      let contentType = "text/plain";
      if (url.endsWith(".css")) contentType = "text/css";
      else if (url.endsWith(".js")) contentType = "application/javascript";
      else if (url.endsWith(".ico")) contentType = "image/x-icon";

      fs.readFile(filePath, (err, data) => {
        if (err) {
          response.writeHead(404, { "Content-Type": "text/plain" });
          response.end("404 Not Found");
        } else {
          response.writeHead(200, { "Content-Type": contentType });
          response.end(data);
        }
      });
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.end(projectContent);
        break;
      case "/registration":
        response.end(registrationContent);
        break;
      default:
        response.end(homeContent);
        break;
    }
  })
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
