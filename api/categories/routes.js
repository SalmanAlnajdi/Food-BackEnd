const express = require("express");

const categoryRouter = express.Router();

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getRecipesByCategory,
} = require("./controllers");

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.post("/", createCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

categoryRouter.get("/:category", getRecipesByCategory);

module.exports = categoryRouter;
