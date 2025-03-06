# Food Helpline - Backend

The backend server for the Food Helpline project, built with Node.js, Express.js, and MongoDB.

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

- [User Model](./models/User.js)
- [FoodItem Model](./models/FoodItem.js)
- [Donation Model](./models/Donation.js)

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
