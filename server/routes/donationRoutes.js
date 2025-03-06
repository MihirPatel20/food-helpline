import express from "express";
import { FoodItem } from "../models/FoodItem.js";
import { Donation } from "../models/Donation.js";
import { authenticateUser } from "./userRoutes.js";

const router = express.Router();

// Create a new donation with food items
router.post("/", authenticateUser, async (req, res) => {
  const data = req.body;
  try {
    // Create single food item
    const foodItem = new FoodItem({
      foodName: data.foodName,
      foodType: data.foodType,
      quantity: data.quantity,
      quantityUnit: data.quantityUnit,
      expiryDate: data.expiryDate,
      storageInstructions: data.storageInstructions,
      allergenInfo: data.allergenInfo,
      nutritionalInfo: data.nutritionalInfo,
      packagingDetails: data.packagingDetails,
    });
    await foodItem.save();

    // Create the donation with the food item ID
    const donation = new Donation({
      donor: req.user._id,
      foodItem: foodItem._id, // Store as array with single item for consistency
      status: data.status || "available",
      notes: data.notes,
      pickupAddress: data.pickupAddress,
      specialInstructions: data.specialInstructions,
    });

    await donation.save();

    // Populate the foodItems in the response
    await donation.populate("foodItem");

    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get donations (all or user-specific)
router.get(["", "/all"], authenticateUser, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const query = {};
    if (status) {
      query.status = status;
    }

    // Check if the path includes "/all" and user has appropriate role
    if (!req.path.includes("/all")) {
      query.donor = req.user._id; // Filter by the authenticated user's ID if not "/all" or not admin
    }

    const totalDonations = await Donation.countDocuments(query);

    const donations = await Donation.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("donor", "name email")
      .populate("foodItem")
      .populate("deliveryAgent", "name email")
      .lean();

    res.json({
      donations,
      currentPage: page,
      totalPages: Math.ceil(totalDonations / limit),
      totalDonations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific donation
router.get("/:id", async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate(
      "donor",
      "name email"
    );
    if (!donation)
      return res.status(404).json({ message: "Donation not found" });
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a donation
router.patch("/:id", authenticateUser, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation)
      return res.status(404).json({ message: "Donation not found" });

    // Check if the user is the donor or an admin
    if (
      donation.donor.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this donation" });
    }

    // Update fields
    if (req.body.foodItems) donation.foodItems = req.body.foodItems;
    if (req.body.status) donation.status = req.body.status;
    if (req.body.notes) donation.notes = req.body.notes;
    if (req.body.specialInstructions)
      donation.specialInstructions = req.body.specialInstructions;

    await donation.save();
    res.json(donation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a donation
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation)
      return res.status(404).json({ message: "Donation not found" });
    res.json({ message: "Donation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign a delivery agent
router.patch("/:id/assign", authenticateUser, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation)
      return res.status(404).json({ message: "Donation not found" });

    donation.deliveryAgent = req.body.deliveryAgentId;
    donation.status = "reserved";

    await donation.save();
    res.json(donation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update pickup details
router.patch("/:id/pickup", authenticateUser, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation)
      return res.status(404).json({ message: "Donation not found" });

    // Check if the user is the assigned delivery agent
    if (donation.deliveryAgent.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update pickup details" });
    }

    donation.actualPickup = {
      time: new Date(),
      signature: req.body.signature,
      photo: req.body.photo,
    };
    donation.status = "donated";

    await donation.save();
    res.json(donation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a rating
router.post("/:id/rate", authenticateUser, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation)
      return res.status(404).json({ message: "Donation not found" });

    const newRating = {
      ratedBy: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment,
    };

    donation.ratings.push(newRating);
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
