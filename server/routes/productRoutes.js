const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
} = require("../controller/productControllers");

//@desc GET all products from database
//@route GET /api/products
//@access Public
router.get("/products", getAllProducts);

//@desc GET a product by id from database
//@route GET /api/product/:id
//@access Public
router.get("/product/:id", getProductById);

module.exports = router;
