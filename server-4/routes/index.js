import { Router } from "express";
import AuthRouter from "./auth.routes.js";
import SellerRouter from "./seller.routes.js";

const MainRouter = Router();

MainRouter.use("/auth", AuthRouter);
MainRouter.use("/seller", SellerRouter);

export default MainRouter;
