const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  ingredient: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  ],

  image: {
    type: String,
    default: "media/recipe.png",
  },
  description: {
    type: String,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
