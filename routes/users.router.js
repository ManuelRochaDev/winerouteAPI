const express = require('express');
const router = express.Router();
const userController = require("../controllers/users.controller");

const expressSanitizer = require('express-sanitizer');

router.use(expressSanitizer())

//rotas dos utilizadores
router.get("/users", userController.getUsers)
router.get("/users/:id", userController.getUserByID)
router.post("/users", userController.addUsers)
router.put("/users/:id", userController.updateUser)
router.delete("/users/:id", userController.deleteUser)
router.post("/login", userController.loginUser)
router.put("/users/block/:id", userController.blockUser)
router.put("/users/upgrade/:id", userController.upgradeUser)

module.exports = router