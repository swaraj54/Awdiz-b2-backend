import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/login", (req, res) => {
  res.send("WELCOME TO  Login Page");
}); 

app.get("/register", (req, res) => {
  res.send("register Page");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
