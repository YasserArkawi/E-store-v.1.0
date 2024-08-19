const { findUserById } = require("../services/UserService");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader !== "undefined") {
    console.log(`file:auth;\nauthHeader:${authHeader}`);
    const [, token] = authHeader.split(" ");

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
      if (err) {
        res.status(403).send({ err: err });
      } else {
        const user = await findUserById(decoded.id);
        if (user.success) {
          if (user.data.is_admin) {
            req.user = {
              data: decoded,
              is_admin: true,
            };
          }
          req.user = {
            data: decoded,
            is_admin: false,
          };
          next();
        } else {
          res.sendStatus(401);
        }
      }
    });
  } else {
    res.sendStatus(401);
  }
};

const generateToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET_KEY, { expiresIn: "1h" });
};

module.exports = { jwtMiddleware, generateToken };
