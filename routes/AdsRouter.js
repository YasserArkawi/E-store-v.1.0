const express = require("express");
const router = express.Router();
const { jwtMiddleware } = require("../auth/auth");
const { managerValidation } = require("../middlewares/ManagerValidation");
const {
  addAd,
  getAllAds,
  deleteAd,
  updateAd,
  getAdById,
} = require("../controllers/AdsController");

router.use(jwtMiddleware);

router.get("/", getAllAds);
router.get("/:id", getAdById);

router.use(managerValidation);

router.post("/", addAd);
router.delete("/:id", deleteAd);
router.put("/:id", updateAd);

module.exports = router;
