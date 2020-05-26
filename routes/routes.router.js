const express = require('express');
const router = express.Router();
const routesController = require("../controllers/routes.controller");
const expressSanitizer = require('express-sanitizer');

router.use(expressSanitizer())

//rotas das... rotas
router.get("/routes", routesController.getRoutes)
router.get("/routes/:id", routesController.getRouteByID)
router.post("/routes", routesController.addRoutes)
router.put("/routes/:id", routesController.updateRoute)
router.delete("/routes/:id", routesController.deleteRoute)

module.exports = router