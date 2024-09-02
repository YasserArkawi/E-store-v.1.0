const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getMostRatedProducts,
  getProductById
} = require("../controllers/ProductController");
const { jwtMiddleware } = require("../auth/auth");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/mostRated", getMostRatedProducts);

router.use(jwtMiddleware);

router.post("/", addProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
