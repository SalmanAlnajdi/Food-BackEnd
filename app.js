const express = require("express");
const connectDB = require("./database");
const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const userRouter = require("./api/users/routes");
require("dotenv").config();

const app = express();

connectDB();

app.use(express.json());

app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

app.use("/users", userRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
