const express = require("express");
const router = express.Router();
const {
  addRate,
  getRateByProduct,
  deleteRatesByUser,
  deleteRatesByProduct,
} = require("../controllers/RatingController");
const { jwtMiddleware } = require("../auth/auth");
const { managerValidation } = require("../middlewares/ManagerValidation");

router.get("/", getRateByProduct);

router.use(jwtMiddleware);
router.post("/", addRate);

router.use(managerValidation);
router.delete("/byUser/:id", deleteRatesByUser);
router.delete("/byProduct/:id", deleteRatesByProduct);

module.exports = router;
