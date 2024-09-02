const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  managerLogin,
  getUserById,
  geAlltUsers,
} = require("../controllers/UserController");
const { managerValidation } = require("../middlewares/managerValidation");
const { jwtMiddleware } = require("../auth/auth");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/managerLogin", managerLogin);

router.use(jwtMiddleware);
router.use(managerValidation);

router.get("/", geAlltUsers);
router.get("/:id", getUserById);

module.exports = router;
