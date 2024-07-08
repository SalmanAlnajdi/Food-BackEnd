const express = require("express");
const upload = require("../../middlewares/multer");

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
categoryRouter.post("/", upload.single("image"), createCategory);
categoryRouter.put("/:id", upload.single("image"), updateCategory);
categoryRouter.delete("/:id", deleteCategory);

categoryRouter.get("/:category/recipes", getRecipesByCategory);

module.exports = categoryRouter;
