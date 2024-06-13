const express = require("express");
const beerController = require("../controllers/barController");

const router = express.Router();

router.get("/bars/:barId/beers", beerController.readAll);
router.get("/beers/:beerId", beerController.read);
router.post("/bars/:barId", beerController.create);
router.patch("/beers/:beerId", beerController.update);
router.delete("/beers/:beerId", beerController.delete);

module.exports = router;