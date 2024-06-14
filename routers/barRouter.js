const express = require("express");
const barController = require("../controllers/barController");
const createBarForm = require("../forms/bar/createBarForm");
const updateBarForm = require("../forms/bar/updateBarForm");

const router = express.Router();

router.get("/", barController.readAll);
router.get("/:barId", barController.read);
router.get("/:barId/degree", barController.readAverageDegree);
router.post("/", createBarForm ,barController.create);
router.patch("/:barId", updateBarForm,barController.update);
router.delete("/:barId", barController.delete);

module.exports = router;