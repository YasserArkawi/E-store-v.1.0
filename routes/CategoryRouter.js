const express = require("express");
const router = express.Router();
const { getAllCategories, getCategoryById, addCategory } = require("../controllers/CategoryController");
const {jwtMiddleware} = require("../auth/auth");

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

router.use(jwtMiddleware);

router.post("/", addCategory);
router.post("/:id", addCategory);



module.exports = router;