const express = require("express");
const router = express.Router();
const {
  makeNewOrder,
  getAllOrders,
  getOrdersByUserId,
  deleteOrder,
} = require("../controllers/OrderController");
const { jwtMiddleware } = require("../auth/auth");
const { managerValidation } = require("../middlewares/managerValidation");

router.use(jwtMiddleware);

router.post("/", makeNewOrder);
router.get("/byUser", getOrdersByUserId);
router.delete("/", deleteOrder);

router.use(managerValidation);

router.get("/", getAllOrders);

module.exports = router;
