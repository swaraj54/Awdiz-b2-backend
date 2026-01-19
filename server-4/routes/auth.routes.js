import { Router } from "express";
import { login, register } from "../controllers/auth.contoller.js";

const AuthRouter = Router();
// Define your auth routes here

AuthRouter.post("/register", register);

AuthRouter.post("/login", login);

export default AuthRouter;
