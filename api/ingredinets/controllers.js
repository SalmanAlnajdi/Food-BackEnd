const Ingredient = require("../../models/Ingredient");
const Recipe = require("../../models/Recipe");

const getIngredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(201).json(ingredients);
  } catch (err) {
    next(err);
  }
};

const getIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    res.status(201).json(ingredient);
  } catch (err) {
    next(err);
  }
};

const createIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    res.status(201).json(ingredient);
  } catch (err) {
    next(err);
  }
};

const updateIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(201).json(ingredient);
  } catch (err) {
    next(err);
  }
};

const deleteIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
    res.status(201).json(ingredient);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
