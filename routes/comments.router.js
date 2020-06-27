const express = require('express');
const router = express.Router();
const commentsController = require("../controllers/comments.controller");
const expressSanitizer = require('express-sanitizer');

router.use(expressSanitizer())

//rotas dos comentários
router.get("/comments", commentsController.getComments)
router.get("/comments/:id", commentsController.getCommentByID)
router.post("/comments", commentsController.addComments)
router.delete("/comments/:id", commentsController.deleteComment)
router.post("/rating", commentsController.addRating)
router.put("/rating/:id", commentsController.updateRating)
router.get("/rating", commentsController.getRatings)

module.exports = router