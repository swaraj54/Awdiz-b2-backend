import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import MainRouter from "./routes/index.js";
import cors from "cors";
import { tokenMiddleware } from "./middlewares/tokenMiddleware.js";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Hello from Server 4");
});

app.use("/api/v1", tokenMiddleware, MainRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
