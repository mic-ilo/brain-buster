//modules
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

dotenv.config();
//controllers
const AuthRouter = require("./controllers/auth.router");
const UserRouter = require("./controllers/user.router");
const QuestionRouter = require("./controllers/question.router");

//server
const app = express();
const PORT = process.env.PORT;
0;

app.use(helmet());

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log(`MongoDB connected`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} for ${req.url}`);

  next();
});
app.use("/", UserRouter);
app.use("/", QuestionRouter);
app.use("/auth", AuthRouter);

// TOKEN CHECK MD HERE

app.use((req, res, next) => {
  const token = req.headers.authorization;

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.sendStatus(401);
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server is listening to port: ${process.env.PORT}`);
});
