const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  recipe: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  image: {
    type: String,
    default: "media/programmer.png",
  },
});

module.exports = mongoose.model("Category", CategorySchema);
