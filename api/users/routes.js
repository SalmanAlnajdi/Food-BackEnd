const express = require("express");
const upload = require("../../middlewares/multer");
const userRouter = express.Router();

const { signup, signin, getUsers } = require("./controllers");
const passport = require("passport");

userRouter.post("/signup", upload.single("image"), signup);
userRouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
userRouter.get("/users", getUsers);

module.exports = userRouter;
