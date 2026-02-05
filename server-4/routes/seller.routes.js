import { Router } from "express";
import {
  addProducts,
  viewAddedProducts,
} from "../controllers/seller.contoller.js";

const SellerRouter = Router();
// Define your auth routes here

SellerRouter.post("/add-products", addProducts);
SellerRouter.get("/view-added-products", viewAddedProducts);

export default SellerRouter;
