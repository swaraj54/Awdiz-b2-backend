import express from "express";
import MainRouter from "./routes/index.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Server 3");
});

app.use("/api/v1", MainRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// localhost:8000/api/v1/auth/login
// localhost:8000/api/v1/auth/register
// localhost:8000/api/v2/auth/register
// localhost:8000/api/v1/auth/logout

// localhost:8000/api/v1/seller/add-product
// localhost:8000/api/v1/seller/update-product
