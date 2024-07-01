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
  try {
    req.body.userId = req.user;
    const recipe = await Recipe.create(req.body);
    await User.findByIdAndUpdate(req.user._id, {
      $push: { urls: recipe._id },
    });

    res.status(201).json("recipe created!");
  } catch (err) {
    next(err);
  }
};

const updateRecipe = async (req, res, next) => {
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

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
