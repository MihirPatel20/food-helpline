const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    foodItems: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FoodItem',
            required: true
        },
        quantity: {
            amount: Number,
            unit: String
        }
    }],
    status: {
        type: String,
        enum: ['pending', 'matched', 'assigned', 'picked_up', 'delivered', 'cancelled'],
        default: 'pending'
    },
    matchedNGO: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deliveryAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pickupWindow: {
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        }
    },
    actualPickup: {
        time: Date,
        signature: String,
        photo: String
    },
    delivery: {
        time: Date,
        signature: String,
        photo: String
    },
    ratings: [{
        ratedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    specialInstructions: String,
    cancellationReason: String,
    disputeDetails: {
        status: {
            type: String,
            enum: ['none', 'open', 'resolved'],
            default: 'none'
        },
        description: String,
        resolution: String
    }
}, {
    timestamps: true
});

// Create indexes
donationSchema.index({ status: 1 });
donationSchema.index({ donor: 1 });
donationSchema.index({ matchedNGO: 1 });
donationSchema.index({ deliveryAgent: 1 });
donationSchema.index({ "pickupWindow.start": 1 });
donationSchema.index({ "disputeDetails.status": 1 });

module.exports = mongoose.model('Donation', donationSchema); 