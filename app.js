const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

// for email 
// /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/

app.use(express.json());


app.use("/store/category",require("./routes/CategoryRouter"));
app.use("/store/user",require("./routes/UserRouter"));
app.use("/store/product",require("./routes/ProductRouter"));




app.listen(process.env.PORT || 3000, () => {
  console.log(`the app is running.`);
});
