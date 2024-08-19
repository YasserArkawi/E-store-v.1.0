const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/UserController");
const {jwtMiddleware} = require("../auth/auth");

router.post("/signup",registerUser);

router.post("/login",loginUser);

router.use(jwtMiddleware);


module.exports = router;