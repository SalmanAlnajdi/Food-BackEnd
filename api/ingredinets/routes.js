const express = require("express");

const ingredientRouter = express.Router();

const {
  getIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require("./controllers");

ingredientRouter.get("/", getIngredients);
ingredientRouter.get("/:id", getIngredient);
ingredientRouter.post("/", createIngredient);
ingredientRouter.put("/:id", updateIngredient);
ingredientRouter.delete("/:id", deleteIngredient);

module.exports = ingredientRouter;
