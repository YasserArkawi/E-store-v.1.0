const multer = require("multer");
const path = require("path");
function multerUpload(destenation) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, destenation));
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Not allowed image type"));
      }
      cb(null, true);
    },
  });
  return upload;
}

module.exports = multerUpload;
