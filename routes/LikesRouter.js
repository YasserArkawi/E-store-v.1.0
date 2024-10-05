const express = require("express");
const router = express.Router();
const { getLikesByUser,addLike, deleteLike } = require("../controllers/LikesController");
const { jwtMiddleware } = require("../auth/auth");

router.use(jwtMiddleware);

router.get("/", getLikesByUser);
router.post("/", addLike);
router.delete("/", deleteLike);

module.exports = router;
