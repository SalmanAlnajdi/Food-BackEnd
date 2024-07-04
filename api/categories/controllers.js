const Category = require("../../models/Category");
const Recipe = require("../../models/Recipe");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate("recipe");
    res.status(201).json(categories);
  } catch (err) {
    next(err);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

const getRecipesByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId).populate("recipe");

    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getRecipesByCategory,
};
