import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
    trim: true,
  },
  foodType: {
    type: String,
    enum: ["cooked", "packaged", "produce", "dairy", "grains"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  quantityUnit: {
    type: String,
    required: true,
    enum: ["kilograms", "items", "servings", "liters", "pounds", "packages"],
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  storageInstructions: String,
  allergenInfo: [String],
  nutritionalInfo: {
    calories: Number,
    proteins: Number,
    carbohydrates: Number,
    fats: Number,
  },
  packagingDetails: String,
});

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

export { FoodItem };
