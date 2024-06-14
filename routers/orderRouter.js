const express = require("express");
const orderController = require("../controllers/orderController");
const createOrderForm = require("../forms/order/createOrderForm");
const updateOrderForm = require("../forms/order/updateOrderForm");

const router = express.Router();

router.get("/bars/:barId/orders", orderController.readByBar);
router.get("/orders/:orderId", orderController.read);
router.post("/bars/:barId/orders", createOrderForm, orderController.create);
router.patch("/orders/:orderId", updateOrderForm, orderController.update);
router.delete("/orders/:orderId", orderController.delete);

module.exports = router;
