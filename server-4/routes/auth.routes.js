import { Router } from "express";
import {
  login,
  register,
  logout,
  getCurrentUser,
} from "../controllers/auth.contoller.js";

const AuthRouter = Router();
// Define your auth routes here

AuthRouter.post("/register", register);

AuthRouter.post("/login", login);
AuthRouter.get("/logout", logout);
AuthRouter.get("/get-current-user", getCurrentUser);

export default AuthRouter;
