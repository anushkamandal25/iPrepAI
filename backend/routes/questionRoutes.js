const express = require("express");
const {togglePinQuestion, updateQuestionNote, addQuestionsToSession} = require('../controllers/questionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.post("/add", addQuestionsToSession);
router.post("/:id/pin", togglePinQuestion);
router.post("/:id/note", updateQuestionNote);

module.exports = router;