const UserModel = require("../models/user.entity");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }

  async login(username, password) {
    const user = await UserModel.findOne({ username });

    if (!user || !user.isActive) {
      throw new Error("User not Found");
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const parsedUser = JSON.parse(JSON.stringify(user));
      delete parsedUser.password;
      return jwt.sign(parsedUser, this.secret, {
        expiresIn: "1d",
      });
    } else {
      return "";
    }
  }

  async createUser(user) {
    const { username, password } = user;
    if (!username || !password) {
      throw new Error("Invalid Request");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      ...user,
      _id: uuidv4(),
      password: hash,
      isActive: true,
      highscore: [],
    });

    const savedUser = await newUser.save();
    return savedUser;
  }

  async findByUsername(username) {
    const user = await UserModel.findOne({ username });
    return user;
  }

  //highScore

  async updateHighScore(username, category, score) {
    console.log("Received parameters:", username, category, score);
    const user = await UserModel.findOne({ username });

    if (!user) {
      return "User not found";
    }

    const highScoreIndex = user.highScore.findIndex(
      (item) => item.category === category
    );

    if (highScoreIndex === -1) {
      user.highScore.push({ category, score });
    } else {
      if (score > user.highScore[highScoreIndex].score) {
        user.highScore[highScoreIndex].score = score;
      }
    }
    await user.save();

    return "High score updated";
  }
}

module.exports = User;
