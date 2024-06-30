const express = require("express");

const userRouter = express.Router();

const { signup, signin, getUsers } = require("./controllers");
const passport = require("passport");

userRouter.post("/signup", signup);
userRouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
userRouter.get("/users", getUsers);

module.exports = userRouter;
