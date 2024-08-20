const UserServices = require("../services/UserService");
const { generateToken } = require("../auth/auth");

module.exports = {
  registerUser: (req, res) => {
    data = req.body;
    if (!data.email || !data.password || !data.f_name || !data.phone) {
      res.status(400).send({ message: "Missing required data" });
    } else {
      // const temp = data.phone;
      // temp.toString();
      // data.phone = "0" + temp;
      // data.phone.toString();
      // console.log(data);
      const result = UserServices.registerUser(data);
      result
        .then((result) => {
          res.status(201).send({
            id: result.insertId,
            name: data.f_name,
            email: data.email,
            success: true,
          });
        })
        .catch((error) => {
          res.status(400).send({
            data: error.message,
            success: false,
          });
        });
    }
  },
  loginUser: (req, res) => {
    data = req.body;
    if (!data.email || !data.password) {
      res.status(400).send({ message: "Missing required data" });
    } else {
      const result = UserServices.loginUser(data);
      result
        .then((result) => {
          result.password = null;
          token = generateToken(result);
          res.status(200).send({
            data: result,
            token: token,
          });
        })
        .catch((error) => {
          res.status(400).send({
            data: error.message,
            token: null,
          });
        });
    }
  },
  managerLogin: (req, res) => {
    data = req.body;
    if (!data.email || !data.password) {
      res.status(400).send({ message: "Missing required data" });
    } else {
      const result = UserServices.managerLogin(data);
      result
        .then((result) => {
          result.password = null;
          token = generateToken(result);
          res.status(200).send({
            data: result,
            token: token,
          });
        })
        .catch((error) => {
          res.status(400);
          if (error.message === "Access not allowed") {
            res.status(403);
          }
          res.send({
            data: error.message,
            token: null,
          });
        });
    }
  },
};
