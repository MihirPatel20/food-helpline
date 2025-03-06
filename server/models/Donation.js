import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem",
    },

    status: {
      type: String,
      enum: ["available", "reserved", "donated", "cancelled"],
      default: "available",
    },
    deliveryAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pickupAddress: {
      type: String,
      required: true,
    },
    actualPickup: {
      time: Date,
      signature: String,
      photo: String,
    },
    delivery: {
      time: Date,
      signature: String,
      photo: String,
    },
    notes: String,
    ratings: [
      {
        ratedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    specialInstructions: String,
  },
  {
    timestamps: true,
  }
);

// Create indexes
donationSchema.index({ status: 1 });
donationSchema.index({ donor: 1 });
donationSchema.index({ deliveryAgent: 1 });
donationSchema.index({ "pickupTimeWindow.start": 1 });

const Donation = mongoose.model("Donation", donationSchema);

export { Donation };
