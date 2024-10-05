const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const { jwtMiddleware } = require("./auth/auth");
env.config();
const path = require("path");
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log(5555);
//     cb(null, path.join(__dirname, "./images"));
//   },
//   filename: (req, file, cb) => {
//     const id = req.body.user_id;
//     cb(
//       null,
//       new Date().toISOString().replace(/:/g, "-") + 1 +
//         // id +
//         path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
//   // fileFilter: (req, file, cb) => {
//   //   console.log(44444);
//   //   const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
//   //   if (!allowedTypes.includes(file.mimetype)) {
//   //     return cb(new Error("Not allowed image type"));
//   //   }
//   //   cb(null, true);
//   // },
// }).single("image");

// for email
// /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/

app.use(express.json());

app.use("/store/category", require("./routes/CategoryRouter"));
app.use("/store/user", require("./routes/UserRouter"));
app.use("/store/product", require("./routes/ProductRouter"));
app.use("/store/order", require("./routes/OrderRouter"));
app.use("/store/rate", require("./routes/RatingRouter"));
app.use("/store/ad", require("./routes/AdsRouter"));
app.use("/store/like", require("./routes/LikesRouter"));

app.use(jwtMiddleware, express.static("images"));

app.listen(process.env.PORT || 3000, () => {
  console.log(`the app is running.`);
});
