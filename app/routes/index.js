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

/*const CategoryController = require("../controllers/CategoryController");
router
	.get("/categories", CategoryController.categories)
	.get("/categories_list", CategoryController.categories_list)
	.post("/categories", CategoryController.add)
	.delete("/categories/:_id", CategoryController.delete);
*/	
const CategoryController = require("../controllers/CategoryController");
router
.get("/categories", CategoryController.categories)
.get("/category_list", CategoryController.category_list)
.post("/categories", CategoryController.add)
.delete("/categories/:id", CategoryController.delete)
.get("/categories/:category_id", CategoryController.category)
.put("/categories", CategoryController.update);


const StoneController = require("../controllers/StoneController");
router.get("/stones", StoneController.stones)
	  .post("/stones", StoneController.add)
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

const StyleController = require("../controllers/StyleController");
router
	.get("/styles", StyleController.styles)
	.get("/style_list", StyleController.style_list)
	.post("/styles", StyleController.add)
	.delete("/styles/:style_id", StyleController.delete)
	.get("/styles/:style_id", StyleController.style)
	.put("/styles", StyleController.update);

const BrandController = require("../controllers/BrandController");
router
	.get("/brands", BrandController.brands)
	.get("/brand_list", BrandController.brand_list)
	.post("/brands", BrandController.add)
	.delete("/brands/:brand_id", BrandController.delete)
	.get("/brands/:brand_id", BrandController.brand)
	.put("/brands", BrandController.update);
module.exports = router;
