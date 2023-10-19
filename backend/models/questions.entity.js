const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: String,
  question: String,
  category: String,
  wrongAnswers: Array,
  correctAnswer: String,
});

const QuestionModel = mongoose.model("questions", schema);

module.exports = QuestionModel;
