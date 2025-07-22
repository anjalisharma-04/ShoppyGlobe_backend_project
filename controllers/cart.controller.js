import Cart from "../models/cart.model.js";

// ✅ Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};

// ✅ Remove from Cart (works for both DELETE and POST)
export const removeFromCart = async (req, res) => {
  try {
    let { userId, productId } = req.params;

    // fallback to body if not in params (POST /api/cart/remove)
    if (!userId || !productId) {
      userId = req.body.userId;
      productId = req.body.productId;
    }

    if (!userId || !productId) {
      return res.status(400).json({ message: "User ID and Product ID are required." });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing product", error: error.message });
  }
};

// ✅ Get User Cart
export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving cart", error: err.message });
  }
};
