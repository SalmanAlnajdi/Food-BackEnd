const Recipe = require("../../models/Recipe");
const Category = require("../../models/Category");
const Ingredient = require("../../models/Ingredient");
const User = require("../../models/User");

const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.status(201).json(recipes);
  } catch (err) {
    next(err);
  }
};

const getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
};

const createRecipe = async (req, res, next) => {
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    const { title, category, ingredient, description, userId } = req.body;
    console.log(req.category);
    const recipe = await Recipe.create({
      title,
      category,
      ingredient,
      description,
      userId,
    });

    await Category.updateMany(
      { _id: { $in: category } },
      { $push: { recipe: recipe._id } }
    );

    console.log(category);
    if (recipe) {
      await Category.findByIdAndUpdate(category, {
        $push: { recipes: recipe._id },
      });
    }

    // req.body.userId = req.user;
    // const recipe = await Recipe.create(req.body);
    // await User.findByIdAndUpdate(req.user._id, {
    //   $push: { urls: recipe._id },

    res.status(201).json("recipe created!");
  } catch (err) {
    next(err);
  }
};

const updateRecipe = async (req, res, next) => {
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
};

const getRecipesByCategory = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({
      category: req.params.category,
    }).populate("Category");
    res.status(201).json(recipes);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesByCategory,
};
