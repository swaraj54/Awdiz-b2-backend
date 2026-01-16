import { Router } from "express";
import { login, register } from "../contorllers/auth.controller.js";

const AuthRouter = Router();

AuthRouter.post("/login", login);

AuthRouter.post("/register", register);
export default AuthRouter;
