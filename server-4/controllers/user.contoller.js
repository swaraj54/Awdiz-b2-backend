import Cart from "../models/cart.schema.js";
import Order from "../models/order.schema.js";
import Product from "../models/product.schema.js";

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

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartData = await Cart.findOne({ user: userId }).populate("products");
    if (!cartData || cartData.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }
    let totalPrice = 0;
    let productIds = [];
    let outOfStockProductList = [];
    for (let i = 0; i < cartData.products.length; i++) {
      let product = await Product.findById(cartData.products[i]._id);
      if (product.stock > 0) {
        totalPrice += cartData.products[i].price;
        productIds.push(cartData.products[i]._id);
        await Product.findByIdAndUpdate(cartData.products[i]._id, {
          $inc: { stock: -1 },
        });
      } else {
        outOfStockProductList.push(product);
      }
    }

    const newOrder = new Order({
      user: userId,
      products: productIds,
      totalPrice: totalPrice,
    });
    await newOrder.save();

    await Cart.findOneAndUpdate({ user: userId }, { $set: { products: [] } });
    return res
      .status(200)
      .json({
        success: true,
        message: "Order Placed successfully.",
        outOfStockProductList,
      });
  } catch (error) {
    return res.status(501).json({ success: false, error });
  }
};
