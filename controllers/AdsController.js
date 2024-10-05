const AdsService = require("../services/AdsService");
module.exports = {
  getAllAds: async (req, res) => {
    try {
      const results = await AdsService.getAllAds();
      res.status(200).send({
        data: results,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: error.message,
        success: false,
      });
    }
  },

  getAdById: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send({ message: "Missinig required data" });
      } else {
        const results = await AdsService.getAdById(id);
        res.status(200).send({
          data: results,
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

  // manager///////////////////////////////////////////////

  addAd: async (req, res) => {
    try {
      const data = req.body;
      if (!data.title || !data.descreption) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const result = await AdsService.addAd(data);
        res.status(201).send({
          add_id: result,
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

  deleteAd: async (req, res) => {
    try {
      const adId = req.params.id;
      if (!adId) {
        res.status(400).send({ message: "Missing required data" });
      }
      const result = await AdsService.daleteAd(adId);
      res.status(200).send({
        deleteId: adId,
        state: result,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: error.message,
        success: false,
      });
    }
  },

  updateAd: async (req, res) => {
    try {
      const data = req.body;
      data.adId = req.params.id;
      if (!data.adId || !data.title || !data.descreption) {
        res.status(400).send({ message: "Missing required data" });
      }
      const result = await AdsService.updateAd(data);
      res.status(200).send({
        updatedId: data.adId,
        state: result,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: error.message,
        success: false,
      });
    }
  },
};
