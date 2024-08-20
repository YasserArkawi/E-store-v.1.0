const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/ProductController");
const { jwtMiddleware } = require("../auth/auth");

router.get("/", getAllProducts);

router.use(jwtMiddleware);

router.post("/", addProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
