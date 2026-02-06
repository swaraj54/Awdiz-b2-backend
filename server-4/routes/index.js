import { Router } from "express";
import AuthRouter from "./auth.routes.js";
import SellerRouter from "./seller.routes.js";
import CommonRouter from "./common.routes.js";
import UserRouter from "./user.routes.js";

const MainRouter = Router();

MainRouter.use("/auth", AuthRouter);
MainRouter.use("/common", CommonRouter);
MainRouter.use("/seller", SellerRouter);
MainRouter.use("/user", UserRouter);

export default MainRouter;
