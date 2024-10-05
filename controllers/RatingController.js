const RatingService = require("../services/RatingService");
module.exports = {
  getRateByProduct: async (req, res) => {
    try {
      const data = req.body;
      if (!data.product_id) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const result = await RatingService.getRateByProduct(data.product_id);
        res.status(200).send({
          data: result,
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: error.message,
        success: false,
      });
    }
  },

  addRate: async (req, res) => {
    try {
      const id = req.user.data.user_id;
      const data = req.body;
      data.user_id = id;
      if (!data.user_id || !data.rating || !data.product_id) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const result = await RatingService.addRate(data);
        res.status(201).send({
          state: result,
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: error.message,
        success: false,
      });
    }
  },

  deleteRatesByUser: async (req, res) => {
    try {
      const user_id = req.params.id;
      if (!user_id) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const result = await RatingService.deleteRatesByUser(user_id);
        res.status(200).send({
          state: result,
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: error.message,
        success: false,
      });
    }
  },

  deleteRatesByProduct: async (req, res) => {
    try {
      const product_id = req.params.id;
      if (!user_id) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const result = await RatingService.deleteRatesByProduct(product_id);
        res.status(200).send({
          state: result,
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: error.message,
        success: false,
      });
    }
  },
};
