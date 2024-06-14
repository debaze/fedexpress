const express = require("express");
const beerOrderController = require("../controllers/beerOrderController");

const router = express.Router();

router.post("/orders/:orderId/beers/:beerId", beerOrderController.create);
router.delete("/orders/:orderId/beers/:beerId", beerOrderController.delete);

module.exports = router;