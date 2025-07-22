import Product from "../models/product.model.js";

// 👉 CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "✅ Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "❌ Failed to create product", error: error.message });
  }
};

// 👉 GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "❌ Failed to fetch products", error: error.message });
  }
};

// 👉 GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "❌ Product not found" });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "❌ Failed to fetch product", error: error.message });
  }
};

// 👉 UPDATE PRODUCT BY ID
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "❌ Product not found" });
    }

    res.status(200).json({
      message: "✅ Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "❌ Failed to update product",
      error: error.message,
    });
  }
};

// 👉 DELETE PRODUCT BY ID
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "❌ Product not found" });
    }
    res.status(200).json({ message: "✅ Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to delete product",
      error: error.message,
    });
  }
};
