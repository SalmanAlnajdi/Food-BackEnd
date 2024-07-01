const express = require("express");

const recipeRouter = express.Router();

const {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("./controllers");

const passport = require("passport");

recipeRouter.get("/", getRecipes);
recipeRouter.get("/:id", getRecipe);
recipeRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createRecipe
);
recipeRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateRecipe
);
recipeRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);

module.exports = recipeRouter;
