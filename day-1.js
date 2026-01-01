import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.url, "req here");
  if (req.url === "/") {
    res.end("You are at the home page");
  } else if (req.url === "/about") {
    res.end("You are at the about page");
  } else if (req.url === "/login") {
    res.end("Login");
  } else if (req.url === "/register") {
    res.end("Register page");
  } else {
    res.statusCode = 404;
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
