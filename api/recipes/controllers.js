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

const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("ingredient");
    res.json(recipe);
  } catch (error) {
    res.status(500).send("Error fetching recipe");
  }
};

const createRecipe = async (req, res, next) => {
  console.log("test", req.body);
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    req.body.userId = req.user._id;
    const { title, category, ingredients, description, userId, image } =
      req.body;
    let newIng = [];
    for await (i of ingredients) {
      let x = await Ingredient.findById(i);
      console.log(x);
      newIng.push(x._id);
    }
    console.log("newIng", newIng);
    const recipe = await Recipe.create({
      title,
      category,
      ingredient: newIng,
      description,
      userId,
      image,
    });

    await Category.updateMany(
      { _id: { $in: category } },
      { $push: { recipe: recipe._id } }
    );

    await Ingredient.updateMany(
      { _id: { $in: newIng } },
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
    const categoryId = req.params.catgeoryid;
    console.log(categoryId);
    const recipes = await Recipe.find({ category: categoryId }).populate(
      "category"
    );
    res.status(201).json(recipes);
  } catch (error) {
    next(error);
  }
};

const getRecipesByUser = async (req, res, next) => {
  try {
    const userId = req.params.userid;
    console.log(userId);
    const recipes = await Recipe.find({ userId: userId }).populate("category");
    res.status(201).json(recipes);
  } catch (error) {
    next(error);
  }
};

const getRecipesByIngredient = async (req, res, next) => {
  try {
    const ingredientId = req.params.ingredientid;
    console.log(ingredientId);
    const recipes = await Recipe.find({ ingredient: ingredientId }).populate(
      "category"
    );
    res.status(201).json(recipes);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesByCategory,
  getRecipesByUser,
  getRecipesByIngredient,
};
