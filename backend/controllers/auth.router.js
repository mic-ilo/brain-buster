const express = require("express");
const router = express.Router();

const User = require("../objects/user");

router.post("/login", async (req, res) => {
  try {
    const user = new User();
    const body = req.body;

    const token = await user.login(body.username, body.password);
    console.log(token);
    if (token) {
      res.status(200).send(token);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(404);
  }
});

module.exports = router;
