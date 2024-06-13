const express = require("express");
const beerController = require("../controllers/beerController");

const router = express.Router();

router.get("/bars/:barId/beers", beerController.readAll);
router.get("/beers/:beerId", beerController.read);
router.post("/bars/:barId/beers", beerController.create);
router.patch("/beers/:beerId", beerController.update);
router.delete("/beers/:beerId", beerController.delete);

module.exports = router;
