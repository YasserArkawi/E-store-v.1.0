const CategoryService = require("../services/CategoryService");
const fs = require("fs");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const results = await CategoryService.getAllCategories();
      res.status(200).send({
        data: results,
        success: true,
      });
      // results
      //   .then((results) => {
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
        data: error.message,
        success: false,
      });
    }
  },
  getCategoryById: async (req, res) => {
    try {
      if (!req.params.id) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const result = await CategoryService.getCategoryById(req.params.id);
        res.status(200).send({
          data: result,
          success: true,
        });
        // result
        //   .then((result) => {
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
        data: error.message,
        success: false,
      });
    }
  },

  // manager ///////////////////////////////////////////////

  addCategory: async (req, res) => {
    try {
      const data2 = req.body;
      const data = JSON.parse(data2.body);
      if (!data.title) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        data.imagePath = req.file.path;
        const result = await CategoryService.addCategory(data);
        res.status(200).send({
          data: result.insertId,
          success: true,
        });
        // result
        //   .then((result) => {
        //     res.status(200).send({
        //       id: result.insertId,
        //       title: req.body.title,
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
      fs.unlinkSync(req.file.path);
      res.status(400).send({
        data: error.message,
        success: false,
      });
    }
  },
  editCategory: async (req, res) => {
    try {
      const data2 = req.body;
      const data = JSON.parse(data2.body);
      data.id = req.params.id;
      if (!data.title || !data.id) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        data.imagePath = req.file.path;
        const result = await CategoryService.editCategory(data);
        res.status(200).send({
          data: result,
          success: true,
        });
        // result
        //   .then((result) => {
        //     res.status(200).send({
        //       id: data.id,
        //       title: data.title,
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
      const editedCategory = await this.getCategoryById(req.params.id);
      fs.unlinkSync(editedCategory.image_path);
      res.status(400).send({
        data: error.message,
        success: false,
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const result = await CategoryService.deleteCategory(id);
        res.status(200).send({
          data: result,
          success: true,
        });
        // results
        //   .then((result) => {
        //     res.status(200).send({
        //       id: id,
        //       state: result,
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
      const deletedCategory = await this.getCategoryById(req.params.id);
      fs.unlinkSync(deletedCategory.image_path);
      res.status(400).send({
        data: error.message,
        success: false,
      });
    }
  },
};
