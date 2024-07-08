const express = require("express");
const passport = require("passport");
const {
  signup,
  signin,
  getUsers,
  getMyProfile,
  updateMyProfile,
} = require("./controllers");
const upload = require("../../middlewares/multer");

const userRouter = express.Router();

userRouter.post("/signup", upload.single("image"), signup);
userRouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
userRouter.get("/", passport.authenticate("jwt", { session: false }), getUsers);
userRouter.get(
  "/myprofile",
  passport.authenticate("jwt", { session: false }),
  getMyProfile
);
userRouter.put(
  "/myprofile",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateMyProfile
);

module.exports = userRouter;
