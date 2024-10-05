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
const { managerValidation } = require("../middlewares/ManagerValidation");
const { categoryUpload } = require("../middlewares/Upload");

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.get("/product/:id", getProductsByCategory);

router.use(jwtMiddleware);
router.use(managerValidation);

router.post("/", categoryUpload.single("image"), addCategory);
router.put("/:id", categoryUpload.single("image"), editCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
