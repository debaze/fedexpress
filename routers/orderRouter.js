const express = require("express");
const orderController = require("../controllers/orderController");
const createOrderForm = require("../forms/order/createOrderForm");

const router = express.Router();

router.get("/bars/:barId/orders", orderController.readAll);
router.get("/orders/:orderId", orderController.readOne);
router.post("/bars/:barId/orders", createOrderForm, orderController.create);
router.patch("/orders/:orderId", orderController.update);
router.delete("/orders/:orderId", orderController.delete);

module.exports = router;