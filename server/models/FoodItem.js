const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['cooked', 'packaged', 'produce', 'dairy', 'grains'],
        required: true
    },
    quantity: {
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        unit: {
            type: String,
            required: true,
            enum: ['kg', 'items', 'servings', 'liters']
        }
    },
    preparationTime: {
        type: Date,
        required: true
    },
    expiryTime: {
        type: Date,
        required: true
    },
    storageInstructions: String,
    allergenInfo: [String],
    nutritionalInfo: {
        calories: Number,
        proteins: Number,
        carbohydrates: Number,
        fats: Number
    },
    packagingDetails: String,
    status: {
        type: String,
        enum: ['available', 'reserved', 'collected', 'expired'],
        default: 'available'
    }
}, {
    timestamps: true
});

// Create indexes
foodItemSchema.index({ category: 1 });
foodItemSchema.index({ status: 1 });
foodItemSchema.index({ expiryTime: 1 });

module.exports = mongoose.model('FoodItem', foodItemSchema); 