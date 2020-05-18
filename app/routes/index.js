const express = require("express");
const router = express.Router();

const ColorController = require("../controllers/ColorController");
router
	.get("/colors", ColorController.colors)
	.get("/color_list", ColorController.color_list)
	.post("/colors", ColorController.add)
	.delete("/colors/:color_id", ColorController.delete)
	.get("/colors/:color_id", ColorController.color)
	.put("/colors", ColorController.update);



const StoneController = require("../controllers/StoneController");
router.get("/stones", StoneController.stones)
	  .post("/stones", StoneController.add)
	  .delete("/stones/:stone_id", StoneController.delete)
	  .get("/stones/:stone_id", StoneController.stone)
	  .put("/stones/:stone_id", StoneController.update);


const ShapeController = require("../controllers/ShapeController");
router
	.get("/shapes", ShapeController.shapes)
	.post("/shapes", ShapeController.add)
	.delete("/shapes/:shape_id", ShapeController.delete)
	.get("/shapes/:shape_id", ShapeController.shape)
	.put("/shapes", ShapeController.update);



const FauxController = require("../controllers/FauxController");
router
	.get("/faux", FauxController.faux)
	.get("/faux_list", FauxController.faux_list);
	
	
		
const VendorController = require("../controllers/VendorController");
router
	.get("/vendors", VendorController.vendors)
	.get("/vendor_list", VendorController.vendor_list)
	.post("/vendors", VendorController.add)
	.delete("/vendors/:vendor_id", VendorController.delete)
	.get("/vendors/:vendor_id", VendorController.vendor)
	.put("/vendors", VendorController.update);

module.exports = router;
