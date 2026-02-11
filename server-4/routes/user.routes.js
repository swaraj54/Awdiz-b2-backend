import { Router } from "express";
import { addCart, getCartProducts, placeOrder } from "../controllers/user.contoller.js";

const UserRouter = Router();
// Define your auth routes here

UserRouter.get("/add-cart/:productId", addCart);
UserRouter.get("/get-cart-products", getCartProducts);
UserRouter.get("/place-order", placeOrder);

export default UserRouter;
