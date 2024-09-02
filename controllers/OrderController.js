const OrderService = require("../services/OrderService");
module.exports = {
  makeNewOrder: async (req, res) => {
    try {
      const data = req.body;
      data.user_id = req.user.data.user_id;
      if (!data.user_id || !data.products) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const result = await OrderService.makeNewOrder(data);
        res.status(201).send({
          order_id: result,
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
  // editOrderByUserId: (req, res) => {
  //   try {
  //     const data = req.body;
  //     if (!data.user_id || !data.products) {
  //       res.status(400).send({ message: "Missing required data" });
  //     } else {
  //       const result = OrderService.editOrderByUserId1(data);
  //       result
  //         .then((result1) => {
  //           data.products.forEach((element) => {
  //             OrderService.editOrderByUserId2(result1, element.product_id)
  //               // .then((result2) => {})
  //               .catch((error) => {
  //                 return res.status(400).send({
  //                   data: error.message,
  //                   success: false,
  //                 });
  //               });
  //           });
  //           res.status(200).send({
  //             data: "Updated",
  //             success: true,
  //           });
  //         })
  //         .catch((error) => {
  //           res.status(400).send({
  //             data: error.message,
  //             success: false,
  //           });
  //         });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).send({
  //       data: error.message,
  //       success: false,
  //     });
  //   }
  // },

  getOrdersByUserId: (req, res) => {
    try {
      const id = req.user.data.user_id;
      if (!id) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const results = OrderService.getOrdersByUserId(id);
        results
          .then((result) => {
            res.status(200).send({
              data: result,
              success: true,
            });
          })
          .catch((err) => {
            res.status(400).send({
              data: err.message,
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

  deleteOrder: (req, res) => {
    try {
      const id = req.user.data.user_id;
      const data = req.body;
      if (!id || data.data.length === 0 || !Array.isArray(data.data)) {
        res.status(400).send({ message: "Missing required data" });
      } else {
        const results = OrderService.deleteOrder(id, data);
        results
          .then((result) => {
            res.status(200).send({
              user_id: id,
              state: result,
              success: true,
            });
          })
          .catch((err) => {
            res.status(400).send({
              data: err.message,
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

  // manager /////////////////////////////////////////////////

  getAllOrders: (req, res) => {
    try {
      const result = OrderService.getAllOrders();
      result
        .then((results) => {
          res.status(200).send({
            data: results,
            success: true,
          });
        })
        .catch((err) => {
          res.status(400).send({
            data: err.message,
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
};
