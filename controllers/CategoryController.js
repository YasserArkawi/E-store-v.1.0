const CategoryService = require("../services/CategoryService");

module.exports = {
  getAllCategories: (req, res) => {
    try {
      const results = CategoryService.getAllCategories();
      results
        .then((results) => {
          res.status(200).send({
            data: results,
            success: true,
          });
        })
        .catch((error) => {
          res.status(400).send({
            data: error.message,
            success: false,
          });
        });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        data: error.message,
        success: false,
      });
    }
  },
  getCategoryById: (req, res) => {
    try {
      if (!req.params.id) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const result = CategoryService.getCategoryById(req.params.id);
        result
          .then((result) => {
            res.status(200).send({
              data: result,
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
    } catch (error) {
      console.log(error);
      res.status(400).send({
        data: error.message,
        success: false,
      });
    }
  },

  // manager ///////////////////////////////////////////////

  addCategory: (req, res) => {
    try {
      if (req.user.is_admin) {
        if (!req.body.title) {
          res.status(400).send({ message: "Missing required data" });
        } else {
          const result = CategoryService.addCategory(req.body);
          result
            .then((result) => {
              res.status(200).send({
                id: result.insertId,
                title: req.body.title,
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
      } else {
        res.status(403).send({ error: "Forbidden" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        data: error.message,
        success: false,
      });
    }
  },
  editCategory: (req, res) => {
    try {
      if (req.user.is_admin) {
        const data = req.body;
        data.id = req.params.id;
        if (!req.body.title || !data.id) {
          res.status(400).send({ message: "Missing required data" });
        } else {
          const result = CategoryService.editCategory(data);
          result
            .then((result) => {
              res.status(200).send({
                id: data.id,
                title: data.title,
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
      } else {
        res.status(403).send({ error: "Forbidden" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        data: error.message,
        success: false,
      });
    }
  },
  deleteCategory: (req, res) => {
    try {
      if (req.user.is_admin) {
        const id = req.params.id;
        if (!id) {
          res.status(400).send({ message: "Missing required data" });
        } else {
          const results = CategoryService.deleteCategory(id);
          results
            .then((result) => {
              res.status(200).send({
                id: id,
                state: result,
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
      } else {
        res.status(403).send({ error: "Forbidden" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        data: error.message,
        success: false,
      });
    }
  },
};
