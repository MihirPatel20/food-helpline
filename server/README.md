# Food Helpline - Backend

The backend server for the Food Helpline project, built with Node.js, Express.js, and MongoDB.

## 🎯 Features

- **RESTful API**
  - Clean architecture
  - Modular design
  - Comprehensive error handling
  - Request validation

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control
  - Password hashing with bcrypt
  - Token management

- **Database**
  - MongoDB with Mongoose ODM
  - Efficient indexing
  - Data validation
  - Relationship management

## 📂 Project Structure

```
server/
├── config/                # Configuration files
│   └── database.js       # Database configuration
├── controllers/          # Request handlers
│   ├── authController.js
│   ├── foodController.js
│   └── donationController.js
├── middleware/           # Custom middleware
│   ├── auth.js          # Authentication middleware
│   └── validation.js    # Request validation
├── models/              # Database models
│   ├── User.js
│   ├── FoodItem.js
│   └── Donation.js
├── routes/              # API routes
│   ├── authRoutes.js
│   ├── foodRoutes.js
│   └── donationRoutes.js
├── .env.example         # Environment variables example
├── package.json         # Project dependencies
├── server.js            # Application entry point
└── README.md           # This file
```

## 🔧 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📝 Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with nodemon
- `npm test` - Run tests (to be implemented)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "donor"
  }
  ```

- `POST /api/auth/login` - User login
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Food Items
- `POST /api/food-items` - Log new food item
- `GET /api/food-items` - List available food items
- `GET /api/food-items/:id` - Get food item details
- `PATCH /api/food-items/:id` - Update food item
- `DELETE /api/food-items/:id` - Delete food item

### Donations
- `POST /api/donations` - Create donation request
- `GET /api/donations` - List donations
- `GET /api/donations/:id` - Get donation details
- `PATCH /api/donations/:id` - Update donation status

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String,
  password: String,
  role: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  }
}
```

### FoodItem Model
```javascript
{
  donor: ObjectId,
  name: String,
  type: String,
  quantity: {
    amount: Number,
    unit: String
  },
  expirationDate: Date,
  status: String
}
```

### Donation Model
```javascript
{
  foodItem: ObjectId,
  donor: ObjectId,
  recipient: ObjectId,
  status: String,
  pickupSchedule: {
    scheduledDate: Date,
    actualPickupDate: Date
  }
}
```

## 🔒 Security

- Password hashing with bcrypt
- JWT token authentication
- Request validation
- MongoDB injection protection
- Rate limiting
- CORS configuration

## 🧪 Testing

To be implemented:
- Unit tests with Jest
- Integration tests
- API endpoint tests
- Database operation tests

## 📈 Performance

- Database indexing
- Query optimization
- Response caching
- Rate limiting
- Error logging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For backend-specific issues or questions, please contact:
- Email: backend@foodhelpline.com
- GitHub Issues: [Create New Issue](https://github.com/yourusername/food-helpline/issues) 