const UserServices = require("../services/UserService");
const { generateToken } = require("../auth/auth");

module.exports = {
  registerUser: async (req, res) => {
    data = req.body;
    if (!data.email || !data.password || !data.f_name || !data.phone) {
      res.status(400).send({ message: "Missing required data" });
    }
    const result = UserServices.registerUser1(data);
    result
      .then((result) => {
        res.status(201).send({
          data: result.insertId,
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
  },
  loginUser: async (req, res) => {
    data = req.body;
    if (!data.email || !data.password) {
      res.status(400).send({ message: "Missing required data" });
    }
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
  },
};
