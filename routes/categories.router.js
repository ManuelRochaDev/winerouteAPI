const express = require('express');
const router = express.Router();
const categoriesController = require("../controllers/categories.controller");
const expressSanitizer = require('express-sanitizer');

router.use(expressSanitizer())

//categories routes
router.get("/categories", categoriesController.getCategories)
router.get("/categories/:id", categoriesController.getCategoryByID)
router.post("/categories", categoriesController.addCategories)
router.delete("/categories/:id", categoriesController.deleteCategory)

module.exports = router