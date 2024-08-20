const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  managerLogin,
} = require("../controllers/UserController");
const { jwtMiddleware } = require("../auth/auth");

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.post("/managerLogin", managerLogin);

router.use(jwtMiddleware);


module.exports = router;
