const express = require("express");
const router = express.Router();
const QuestionModel = require("../models/questions.entity");

router.get("/play", async (req, res) => {
  try {
    // Extract the 'category' query parameter from the request
    const { category } = req.query;

    // Create a query object to filter based on the category
    const query = category ? { category } : {};

    // Use the query to find matching documents in the database
    const questions = await QuestionModel.find(query);

    res.json(questions);
  } catch (error) {
    // Handle any potential errors here
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
