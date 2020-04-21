const express = require("express");
const router = express.Router();

const ColorController = require("../controllers/ColorController");
router
	.get("/colors", ColorController.colors)
	.post("/colors", ColorController.add)
	.delete("/colors/:colod_id", ColorController.delete);



const StoneController = require("../controllers/StoneController");
router.get("/stones", StoneController.stones);



const ShapeController = require("../controllers/ShapeController");
router.get("/shapes", ShapeController.shapes);

module.exports = router;
