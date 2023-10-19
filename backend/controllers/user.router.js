const express = require("express");
const router = express.Router();
const User = require("../objects/user");
const bcrypt = require("bcrypt");

//Create user

router.post("/user", async (req, res) => {
  const user = new User();
  const body = req.body;

  const savedUser = await user.createUser(body);

  res.json(savedUser);
});

//get user
router.get("/user", async (req, res) => {
  try {
    const { username } = req.query;
    const user = new User();
    const savedUser = await user.findByUsername(username);

    if (savedUser) {
      res.json(savedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update username or password
router.put("/user/:username", async (req, res) => {
  const username = req.params.username.toLowerCase();
  const newPassword = req.body.password;

  try {
    const users = new User();
    const savedUser = await users.findByUsername(username);

    if (!savedUser) {
      res.status(404).send("User not found");
    } else {
      // Update the username
      if (req.body.username) {
        savedUser.username = req.body.username;
      }

      // Update the password
      if (newPassword) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        savedUser.password = hash;
      }

      await savedUser.save();

      // Send a success response
      res.status(200).send("User updated successfully");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

//soft deletion of user
router.put("/user/delete/:username", async (req, res) => {
  const username = req.params.username.toLowerCase();

  try {
    const users = new User();
    const savedUser = await users.findByUsername(username);

    if (!savedUser) {
      res.status(404).send("User not found");
    } else {
      savedUser.isActive = false;
      await savedUser.save();
      // Send a success response
      res.status(200).send("User updated successfully");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

//update highscore
router.put("/user/:username", async (req, res) => {
  const username = req.params.username.toLowerCase();
  const category = req.query.category.toLowerCase();
  const score = req.query.score;

  try {
    const users = new User();
    const savedUser = await users.updateHighScore(username, category, score);

    if (!savedUser) {
      res.status(404).send("failed to update");
    } else {
      await savedUser.save();
      res.status(200).send("High score updated");
    }
  } catch (error) {
    console.error("Error updating score", error);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
