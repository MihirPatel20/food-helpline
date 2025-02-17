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
      enum: ["restaurant", "ngo", "delivery_agent", "admin"],
      required: true,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "active", "suspended"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    discriminatorKey: "userType",
  }
);

const User = mongoose.model("User", userSchema);

// Create discriminator models for different user types
const Restaurant = User.discriminator(
  "restaurant",
  new mongoose.Schema({
    businessName: String,
    businessLicense: String,
    operatingHours: {
      start: String,
      end: String,
    },
    location: locationSchema,
  })
);

const NGO = User.discriminator(
  "ngo",
  new mongoose.Schema({
    registrationNumber: String,
    capacity: Number,
    serviceAreas: [
      {
        pincode: String,
        radius: Number,
      },
    ],
    operatingHours: {
      start: String,
      end: String,
    },
    location: locationSchema,
  })
);

const DeliveryAgent = User.discriminator(
  "delivery_agent",
  new mongoose.Schema({
    vehicleType: String,
    vehicleNumber: String,
    availability: {
      type: Boolean,
      default: false,
    },
    currentLocation: locationSchema,
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
userSchema.index({ status: 1 });

export { User, Restaurant, NGO, DeliveryAgent };
