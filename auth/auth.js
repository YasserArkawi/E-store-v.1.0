const UserService = require("../services/UserService");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (typeof authHeader !== "undefined") {
      // console.log(`file:auth;\nauthHeader:${authHeader}`);
      const [, token] = authHeader.split(" ");

      jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
        if (err) {
          res.status(403).send({ error: err });
        } else {
          const user = await UserService.getUserById(decoded.user_id);
          if (user) {
            if (user.is_admin === 1) {
              req.user = {
                data: decoded,
                is_admin: true,
              };
            } else {
              req.user = {
                data: decoded,
                is_admin: false,
              };
            }
            next();
            // user
            //   .then((result) => {
            //     if (result.is_admin === 1) {
            //       req.user = {
            //         data: decoded,
            //         is_admin: true,
            //       };
            //     } else {
            //       req.user = {
            //         data: decoded,
            //         is_admin: false,
            //       };
            //     }
            //     next();
            //   })
            //   .catch((error) => {
            //     res.status(401).send({ error: "Unauthorized" });
            //     next();
            //   });
          } else {
            res.status(401).send({ error: "Unauthorized" });
            next();
          }
        }
      });
    } else {
      res.status(401).send({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      data: error.message,
      state: "Uncomplete Authorization",
      success: false,
    });
  }
};

const generateToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET_KEY, { expiresIn: "1h" });
};

module.exports = { jwtMiddleware, generateToken };
