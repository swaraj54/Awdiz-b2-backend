import Cart from "../models/cart.schema.js";

export const addCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    const userCart = await Cart.findOne({ user: userId });
    if (userCart) {
      userCart.products.push(productId);
      await userCart.save();
    } else {
      const newCart = new Cart({ user: userId, product: [productId] });
      await newCart.save();
    }
    return res
      .status(201)
      .json({ success: true, message: "Prodcut added to cart successfully." });
  } catch (error) {
    return res.status(501).json({ success: false, error });
  }
};
export const getCartProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartData = await Cart.findOne({ user: userId }).populate("products");
    console.log(cartData, "cartData");
    return res
      .status(200)
      .json({ success: true, products: cartData.products || [] });
  } catch (error) {
    return res.status(501).json({ success: false, error });
  }
};
