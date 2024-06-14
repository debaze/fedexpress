const express = require("express");
const beerController = require("../controllers/beerController");
const createBeerForm = require("../forms/beer/createBeerForm");
const updateBeerForm = require("../forms/beer/updateBeerForm");

const router = express.Router();

router.get("/bars/:barId/beers", beerController.readAll);
router.get("/beers/:beerId", beerController.read);
router.post("/bars/:barId/beers", createBeerForm, beerController.create);
router.patch("/beers/:beerId", updateBeerForm, beerController.update);
router.delete("/beers/:beerId", beerController.delete);

module.exports = router;