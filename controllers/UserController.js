const UserServices = require("../services/UserService");
const { generateToken } = require("../auth/auth");
const fs = require("fs");

module.exports = {
  registerUser: async (req, res) => {
    try {
      // console.log(req.file);
      const data2 = req.body;
      // console.log(data2.body);
      const data = JSON.parse(data2.body);
      // console.log("data2 :", data);
      if (!data.email || !data.password || !data.f_name || !data.phone) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        if (
          !data.email.match(
            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
          )
        ) {
          res.status(400).send({ message: "Invalid email pattern" });
        } else {
          // let imageBuf = null;
          // let imageType = null;
          // console.log(req.file);
          // console.log(req.headers);
          // res.sendStatus(200);
          // upload(req, res, (err) => {
          //   if (err) return res.sendStatus(400);
          //   console.log(req.file);
          //   return res.sendStatus(200);
          // });
          // if (!req.file || Object.keys(req.file).length === 0) {
          //   imageBuf = null;
          //   imageType = null;
          //   console.log(1111111);
          // } else {
          //   imageBuf = req.file.buffer;
          //   imageType = req.file.mimetype;
          //   console.log(2222222);
          // }
          // console.log(imageBuf);
          // console.log(imageType);

          // data.imageBuf = imageBuf;
          // data.imageType = imageType;
          // const imageUrl = `/image/user/${id}`;
          // data.imageUrl = imageUrl;

          data.imagePath = req.file.path;
          const result = await UserServices.registerUser(data);
          res.status(201).send({
            id: result.insertId,
            name: data.f_name,
            email: data.email,
            success: true,
          });
          // result
          //   .then((result) => {
          //     res.status(201).send({
          //       id: result.insertId,
          //       name: data.f_name,
          //       email: data.email,
          //       success: true,
          //     });
          //   })
          //   .catch((error) => {
          //     res.status(400).send({
          //       data: error.message,
          //       success: false,
          //     });
          //   });
        }
      }
    } catch (error) {
      console.log(error);
      fs.unlinkSync(req.file.path);
      res.status(400).send({
        data: error.message,
        success: false,
      });
    }
  },
  loginUser: async (req, res) => {
    try {
      const data = req.body;
      if (!data.email || !data.password) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        if (
          !data.email.match(
            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
          )
        ) {
          res.status(400).send({ message: "Invalid email pattern" });
        } else {
          const result = await UserServices.loginUser(data);
          result.password = null;
          result.imagePath = null;
          const token = generateToken(result);
          res.status(200).send({
            // data: result,
            token: token,
            success: true,
          });
          // result
          //   .then((result) => {
          //     result.password = null;
          //     token = generateToken(result);
          //     res.status(200).send({
          //       data: result,
          //       token: token,
          //     });
          //   })
          //   .catch((error) => {
          //     res.status(400).send({
          //       data: error.message,
          //       token: null,
          //     });
          //   });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400);
      if (error === "Access not allowed") {
        res.status(403);
      }
      res.send({
        data: error,
        token: null,
        success: false,
      });
    }
  },
  managerLogin: async (req, res) => {
    try {
      const data = req.body;
      if (!data.email || !data.password) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        if (
          !data.email.match(
            /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
          )
        ) {
          res.status(400).send({ message: "Invalid email pattern" });
        } else {
          const result = await UserServices.managerLogin(data);
          result.password = null;
          const token = generateToken(result);
          res.status(200).send({
            // data: result,
            token: token,
            success: true,
          });
          // result
          //   .then((result) => {
          //     result.password = null;
          //     token = generateToken(result);
          //     res.status(200).send({
          //       data: result,
          //       token: token,
          //     });
          //   })
          //   .catch((error) => {
          //     res.status(400);
          //     if (error.message === "Access not allowed") {
          //       res.status(403);
          //     }
          //     res.send({
          //       data: error.message,
          //       token: null,
          //     });
          //   });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400);
      if (error === "Access not allowed") {
        res.status(403);
      }
      res.send({
        data: error,
        token: null,
        success: false,
      });
    }
  },

  editUser: async (req, res) => {
    try {
      const id = req.user.data.user_id;
      const data2 = req.body;
      const data = JSON.parse(data2.body);
      data.user_id = id;
      data.imagePath = req.file.path;
      // let imageBuf;
      // let imageType;
      // if (!req.file || Object.keys(req.file).length === 0) {
      //   imageBuf = null;
      //   imageType = null;
      // } else {
      //   imageBuf = req.file.buffer;
      //   imageType = req.file.mimetype;
      // }
      // data.imageBuf = imageBuf;
      // data.imageType = imageType;
      // const imageUrl = `/image/user/${id}`;
      // data.imageUrl = imageUrl;
      const result = await UserServices.editUser(data);
      res.status(200).send({
        data: result,
        success: true,
      });
    } catch (error) {
      console.log(error);
      fs.unlinkSync(req.file.path);
      res.status(400).send({
        data: error,
        success: false,
      });
    }
  },

  // manager /////////////////////////////////////////////////////

  getUserById: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const result = await UserServices.getUserById(id);
        res.status(200).send({
          data: result,
          success: true,
        });
        // result
        //   .then((result) => {
        //     result.password = null;
        //     res.status(200).send({
        //       data: result,
        //       success: true,
        //     });
        //   })
        //   .catch((error) => {
        //     res.status(400).send({
        //       data: error.message,
        //       success: false,
        //     });
        //   });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        data: error,
        success: false,
      });
    }
  },

  getUserByName: async (req, res) => {
    try {
      const name = req.body.name;
      if (!name) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const result = await UserServices.getUserByName(name);
        res.status(200).send({
          data: result,
          success: true,
        });
        // result
        //   .then((result) => {
        //     result.password = null;
        //     res.status(200).send({
        //       data: result,
        //       success: true,
        //     });
        //   })
        //   .catch((error) => {
        //     res.status(400).send({
        //       data: error.message,
        //       success: false,
        //     });
        //   });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        data: error,
        success: false,
      });
    }
  },

  geAlltUsers: async (req, res) => {
    try {
      const results = await UserServices.geAlltUsers();
      results.map((user) => {
        user.password = null;
      });
      res.status(200).send({
        data: results,
        success: true,
      });
      // result
      //   .then((results) => {
      //     results.forEach((element) => {
      //       element.password = null;
      //     });
      //     res.status(200).send({
      //       data: results,
      //       success: true,
      //     });
      //   })
      //   .catch((error) => {
      //     res.status(400).send({
      //       data: error.message,
      //       success: false,
      //     });
      //   });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        data: error,
        success: false,
      });
    }
  },
};
