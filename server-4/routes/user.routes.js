import { Router } from "express";
import { addCart, getCartProducts } from "../controllers/user.contoller.js";

const UserRouter = Router();
// Define your auth routes here

UserRouter.get("/add-cart/:productId", addCart);
UserRouter.get("/get-cart-products", getCartProducts);

export default UserRouter;
