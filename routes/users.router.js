const express = require('express');
const router = express.Router();
const userController = require("../controllers/users.controller");

const expressSanitizer = require('express-sanitizer');

router.use(expressSanitizer())

//user routes
router.get("/users", userController.getUsers)
router.get("/users/:id", userController.getUserByID)
router.post("/users", userController.addUsers)
router.put("/users/:id", userController.updateUser)
router.delete("/users/:id", userController.deleteUser)
router.get("/login", userController.loginUser)

module.exports = router