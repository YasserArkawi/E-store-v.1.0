const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  managerLogin,
  getUserById,
  geAlltUsers,
  editUser,
} = require("../controllers/UserController");
const { managerValidation } = require("../middlewares/ManagerValidation");
const { jwtMiddleware } = require("../auth/auth");
const { userUpload } = require("../middlewares/Upload.js");

// const multer = require("multer");
// const path = require("path");

// // const storage = multer.memoryStorage({});
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../images/users/"));
//   },
//   filename: (req, file, cb) => {
//     // console.log(req);
//     // const data2 = req.body;
//     // console.log(req.body);
//     // req.body = JSON.parse(data2.body);
//     // console.log("data2:", req.body);
//     // const id = req.body.user_id;
//     cb(
//       null,
//       new Date().toISOString().replace(/:/g, "-") + file.originalname
//       // path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error("Not allowed image type"));
//     }
//     cb(null, true);
//   },
// });

router.post("/signup", userUpload.single("image"), registerUser);
router.post("/login", loginUser);
router.post("/managerLogin", managerLogin);

router.use(jwtMiddleware);

router.put("/edit", userUpload.single("image"), editUser);

router.use(managerValidation);

router.get("/", geAlltUsers);
router.get("/:id", getUserById);

module.exports = router;
