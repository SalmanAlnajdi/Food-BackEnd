const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
});

module.exports = mongoose.model("Ingredient", IngredientSchema);
