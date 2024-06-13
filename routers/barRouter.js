const express = require("express");
const barController = require("../controllers/barController");

const router = express.Router();

router.get("/", barController.readAll);
router.get("/:barId", barController.read);
router.post("/", barController.create);
router.patch("/:barId", barController.update);
router.delete("/:barId", barController.delete);

module.exports = router;