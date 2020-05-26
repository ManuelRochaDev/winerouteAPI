const express = require('express');
const router = express.Router();
const poisController = require("../controllers/pois.controller");
const expressSanitizer = require('express-sanitizer');

router.use(expressSanitizer())

//rotas dos pontos de interesse
router.get("/pois", poisController.getPois)
router.get("/pois/:id", poisController.getPoiByID)
router.post("/pois", poisController.addPois)
router.delete("/pois/:id", poisController.deletePoi)

module.exports = router