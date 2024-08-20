const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  addCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/CategoryController");
const { getProductsByCategory } = require("../controllers/ProductController");
const { jwtMiddleware } = require("../auth/auth");

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

router.use(jwtMiddleware);

router.post("/", addCategory);
router.put("/:id", editCategory);
router.get("/product/:id", getProductsByCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
