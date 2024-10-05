const multerUpload = require("./MulterUpload");

const userUpload = multerUpload("../images/users");
const adUpload = multerUpload("/images/ad");
const categoryUpload = multerUpload("/images/category");
const productUpload = multerUpload("/images/product");

module.exports = { userUpload, adUpload, categoryUpload, productUpload};
