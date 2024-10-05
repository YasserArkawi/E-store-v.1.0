const LikesService = require("../services/LikesService");

module.exports = {
  getLikesByUser: async (req, res) => {
    try {
      const user_id = req.user.data.user_id;
      if (!user_id) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const result = await LikesService.getLikesByUser(user_id);
        res.status(200).send({
          data: result,
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: error.message,
        success: false,
      });
    }
  },

  addLike: async (req, res) => {
    try {
      const user_id = req.user.data.user_id;
      const data = req.body;
      data.user_id = user_id;
      if (!data.user_id || !data.product_id) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const result = await LikesService.addLike(data);
        res.status(201).send({
          like_id: result,
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: error.message,
        success: false,
      });
    }
  },

  deleteLike: async (req, res) => {
    try {
      const user_id = req.user.data.user_id;
      const data = req.body;
      data.user_id = user_id;
      if (!data.user_id || !data.product_id) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const result = await LikesService.deleteLike(data);
        res.status(200).send({
          state: result,
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: error.message,
        success: false,
      });
    }
  },
};
