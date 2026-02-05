import Product from "../models/product.schema.js";

export const viewProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, products });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const viewSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.status(200).json({ success: true, product });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
