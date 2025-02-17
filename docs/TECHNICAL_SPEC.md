# Food Helpline - Technical Specification

## Table of Contents
1. [Technology Stack](#technology-stack)
2. [System Architecture](#system-architecture)
3. [Database Design](#database-design)
4. [API Endpoints](#api-endpoints)
5. [Authentication](#authentication)
6. [Implementation Details](#implementation-details)

## Technology Stack
- **Backend**: Node.js (v14+) with Express.js
- **Database**: MongoDB (v4.4+)
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful Architecture

## System Architecture

### Project Structure
```
food-helpline/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── config.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Donation.js
│   │   └── Assignment.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── donation.routes.js
│   │   └── assignment.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── donation.controller.js
│   │   └── assignment.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── validation.middleware.js
│   └── utils/
│       └── helpers.js
├── package.json
└── server.js
```

## Database Design

### MongoDB Schemas

```javascript
// Base User Schema with Discriminators
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  userType: {
    type: String,
    enum: ['restaurant', 'ngo', 'delivery_agent', 'admin'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended'],
    default: 'pending'
  },
  preferredLanguage: {
    type: String,
    enum: ['english', 'hindi', 'gujarati'],
    default: 'english'
  }
}, { 
  timestamps: true,
  discriminatorKey: 'userType'
});

// Restaurant Profile
const Restaurant = User.discriminator('restaurant', new mongoose.Schema({
  businessName: String,
  businessLicense: String,
  operatingHours: {
    start: String,
    end: String
  },
  location: locationSchema
}));

// NGO Profile
const NGO = User.discriminator('ngo', new mongoose.Schema({
  registrationNumber: String,
  capacity: Number,
  serviceAreas: [{
    pincode: String,
    radius: Number
  }],
  operatingHours: {
    start: String,
    end: String
  },
  location: locationSchema
}));

// Food Item Schema
const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['cooked', 'packaged', 'produce', 'dairy', 'grains'],
    required: true
  },
  quantity: {
    amount: { type: Number, required: true, min: 0 },
    unit: {
      type: String,
      enum: ['kg', 'items', 'servings', 'liters'],
      required: true
    }
  },
  preparationTime: Date,
  expiryTime: Date,
  nutritionalInfo: {
    calories: Number,
    proteins: Number,
    carbohydrates: Number,
    fats: Number
  }
});

// Donation Schema
const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  foodItems: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
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
  pickupWindow: {
    start: Date,
    end: Date
  },
  delivery: {
    time: Date,
    signature: String,
    photo: String
  },
  disputeDetails: {
    status: {
      type: String,
      enum: ['none', 'open', 'resolved'],
      default: 'none'
    },
    description: String,
    resolution: String
  }
});
```

### Database Indexes
```javascript
// User indexes
userSchema.index({ "location.coordinates": "2dsphere" });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ status: 1 });

// Food Item indexes
foodItemSchema.index({ category: 1 });
foodItemSchema.index({ status: 1 });
foodItemSchema.index({ expiryTime: 1 });

// Donation indexes
donationSchema.index({ status: 1 });
donationSchema.index({ donor: 1 });
donationSchema.index({ matchedNGO: 1 });
donationSchema.index({ "pickupWindow.start": 1 });
```

## API Endpoints

### Authentication
```javascript
// POST /api/v1/auth/register
{
  "email": "user@example.com",
  "password": "securepassword",
  "userType": "restaurant",
  "phone": "1234567890",
  "location": {
    "address": "123 Street",
    "city": "City",
    "state": "State",
    "pincode": "380015",
    "coordinates": [72.5714, 23.0225]
  }
}

// POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Donations
```javascript
// POST /api/v1/donations
{
  "foodType": "Cooked Meals",
  "quantity": 50,
  "expiryTime": "2024-03-20T18:00:00Z",
  "specialInstructions": "Keep refrigerated"
}

// GET /api/v1/donations/:id
// PUT /api/v1/donations/:id
{
  "status": "accepted"
}
```

## Authentication

```javascript
// JWT Middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};
```

## Implementation Details

### Example Controller Logic
```javascript
// Create Donation
const createDonation = async (req, res) => {
  try {
    const donation = new Donation({
      restaurantId: req.user._id,
      ...req.body
    });
    await donation.save();
    
    // Find nearby NGOs
    const nearbyNGOs = await User.find({
      userType: 'ngo',
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: req.user.location.coordinates
          },
          $maxDistance: 10000 // 10km radius
        }
      }
    });
    
    // Notification logic here
    
    res.status(201).json({
      success: true,
      data: donation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
```

### Environment Variables
```plaintext
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/food_helpline
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

This technical specification provides implementation details for developers. Would you like me to elaborate on any specific section or add more implementation details? 