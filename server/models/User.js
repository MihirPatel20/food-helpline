import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  pincode: String,
  coordinates: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["donor", "agent", "admin"],
      required: true,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
    discriminatorKey: "userType",
  }
);

const User = mongoose.model("User", userSchema);

// Create discriminator models for different user types
const Donor = User.discriminator(
  "donor",
  new mongoose.Schema({
    businessName: String,
    operatingHours: {
      start: String,
      end: String,
    },
    location: locationSchema,
  })
);

// Agents are users who will get the donations from donors
const Agent = User.discriminator(
  "agent",
  new mongoose.Schema({
    businessName: String,
    operatingHours: {
      start: String,
      end: String,
    },
    location: locationSchema,
    activeDeliveries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donation",
      },
    ],
  })
);

// Create indexes
userSchema.index({ "location.coordinates": "2dsphere" });

export { User, Donor, Agent };
