const ProductService = require("../services/ProductService");

module.exports = {
  getAllProducts: (req, res) => {
    const results = ProductService.getAllProducts();
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
  },
  getProductsByCategory: (req, res) => {
    if (!req.params.id) {
      res.status(400).send({ message: "Missing required data" });
    } else {
      const results = ProductService.getProductsByCategory(req.params.id);
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
    }
  },

  // manager /////////////////////////////////////////////////////////

  addProduct: (req, res) => {
    if (req.user.is_admin) {
      const data = req.body;
      if (
        !data.category_id ||
        !data.title ||
        !data.descreption ||
        !data.price ||
        !data.availables
      ) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const results = ProductService.addProduct(data);
        results
          .then((result) => {
            res.status(200).send({
              id: result.insertId,
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
  },
  editProduct: (req, res) => {
    if (req.user.is_admin) {
      const data = req.body;
      data.id = req.params.id;
      if (
        !data.category_id ||
        !data.title ||
        !data.descreption ||
        !data.price ||
        !data.availables ||
        !data.id
      ) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const results = ProductService.editProduct(data);
        results
          .then((result) => {
            res.status(200).send({
              id: data.id,
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
  },
  deleteProduct: (req, res) => {
    if (req.user.is_admin) {
      const id = req.params.id;
      if (!id) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const results = ProductService.deleteProduct(id);
        results
          .then((result) => {
            res.status(200).send({
              id: result,
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
  },
};
