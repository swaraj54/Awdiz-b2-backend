import { Router } from "express";
import {
  viewProducts,
  viewSingleProduct,
} from "../controllers/common.contoller.js";

const CommonRouter = Router();
// Define your auth routes here

CommonRouter.get("/view-products", viewProducts);
CommonRouter.get("/view-single-product/:id", viewSingleProduct);

export default CommonRouter;
