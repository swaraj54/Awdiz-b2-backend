import { Router } from "express";
import Product from "../models/product.schema.js";
const QueryRouter = Router();
// Define your auth routes here

QueryRouter.get("/gt", async (req, res) => {
  try {
    const products = await Product.find({ price: { $gt: 500 } });
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});

QueryRouter.get("/gte", async (req, res) => {
  try {
    const products = await Product.find({ price: { $gte: 500 } });
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});

QueryRouter.get("/lt", async (req, res) => {
  try {
    const products = await Product.find({ price: { $lt: 500 } });
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});

QueryRouter.get("/lte", async (req, res) => {
  try {
    const products = await Product.find({ price: { $lte: 500 } });
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});

QueryRouter.get("/eq", async (req, res) => {
  try {
    const products = await Product.find({ price: { $eq: 1000 } });
    // const products = await Product.find({ price: 1000 });
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});

QueryRouter.get("/ne", async (req, res) => {
  try {
    const products = await Product.find({ price: { $ne: 1000 } });
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});

QueryRouter.get("/in", async (req, res) => {
  try {
    const products = await Product.find({ price: { $in: [1000, 2000, 500] } });
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});

QueryRouter.get("/nin", async (req, res) => {
  try {
    const products = await Product.find({ price: { $nin: [1000, 2000, 500] } });
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});

QueryRouter.get("/exists", async (req, res) => {
  try {
    const products = await Product.find({ price: { $exists: true } });
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});

QueryRouter.get("/and", async (req, res) => {
  try {
    const products = await Product.find({
      $and: [{ price: { $gt: 1000 } }, { stock: { $gt: 100 } }],
    });
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});

QueryRouter.get("/or", async (req, res) => {
  try {
    const products = await Product.find({
      $or: [{ price: { $gt: 1000 } }, { stock: { $gt: 100 } }],
    });
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});

QueryRouter.get("/not", async (req, res) => {
  try {
    const products = await Product.find({ stock: { $not: { $gt: 100 } } });
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});

QueryRouter.get("/nor", async (req, res) => {
  try {
    const products = await Product.find({
      $nor: [{ stock: { $gt: 100 } }, { price: { $gt: 1000 } }],
    });
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});
// Number("100") = 100
QueryRouter.get("/type", async (req, res) => {
  try {
    const products = await Product.find({ stock: { $type: "string" } });
    // const updatedProduct = await Product.findByIdAndUpdate(products._id, {
    //   stock: Number(products.stock),
    // });
    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});

QueryRouter.get("/matching-grouping", async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $match: { price: { $gt: 500 } } },
      {
        $group: {
          // _id: "$name",
          _id: "$category",
          additionOfStock: { $sum: "$stock" },
          totalCost: { $sum: { $multiply: ["$price", "$stock"] } },
        },
      },
    ]);

    return res.send(products);
  } catch (error) {
    return res.send(error);
  }
});
export default QueryRouter;
