const express = require("express");
const upload = require("../../middlewares/multer");
const recipeRouter = express.Router();

const {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesByCategory,
  getRecipesByUser,
  getRecipesByIngredient,
} = require("./controllers");

const passport = require("passport");

recipeRouter.get("/", getRecipes);
recipeRouter.get("/:id", getRecipe);
recipeRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createRecipe
);
recipeRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateRecipe
);
recipeRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);

recipeRouter.get("/bycategory/:catgeoryid", getRecipesByCategory);
recipeRouter.get("/byuser/:userid", getRecipesByUser);
recipeRouter.get("/byingredient/:ingredientid", getRecipesByIngredient);

module.exports = recipeRouter;
