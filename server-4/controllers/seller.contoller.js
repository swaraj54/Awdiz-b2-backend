import Product from "../models/product.schema.js";

export const addProducts = async (req, res) => {
  try {
    const { name, description, price, category, stock, img } = req.body;
    if (!name || !description || !price || !category || !stock) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const sellerId = req.user._id; // Assuming tokenMiddleware adds user info to req
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      img,
      seller: sellerId,
    });
    await newProduct.save();
    return res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const viewAddedProducts = async (req, res) => {
  try {
    const sellerId = req.user._id; // Assuming tokenMiddleware adds user info to req
    const products = await Product.find({ seller: sellerId });
    return res.status(200).json({ success: true, products });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
