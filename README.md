# Food Helpline Project

## 🌟 Overview

Food Helpline is a platform that helps reduce food waste by creating an efficient system for food donation and distribution. It connects restaurants, event organizers, and individuals who have surplus food with NGOs and food banks that can distribute it to those in need.

## 🔧 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (v4.4 or higher)

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/MihirPatel20/food-helpline.git
   cd food-helpline
   ```

2. **Set up the server**

   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm start
   ```

3. **Set up the client**

   ```bash
   cd client
   npm install
   npm start
   ```

4. **Access the application**

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 📂 Project Structure

```
food-helpline/
├── client/           # Frontend application
├── server/           # Backend API server
└── README.md         # This file
```

## 🛠 Tech Stack

- **Frontend**

  - HTML5, CSS3
  - Vanilla JavaScript
  - Responsive Design

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication

## 🚀 Features

- **User Management**

  - Role-based authentication (donors, agents, admins)
  - Secure login and registration
  - Profile management

- **Food Donation Management**

  - Log surplus food details
  - Real-time food availability tracking
  - Food quality and safety guidelines

- **Recipient(Agent) Features**

  - can see available donations
  - Request food pickup
  - Track donation history

- **Scheduling System**

  - Flexible pickup scheduling
  - Real-time status updates
  - Delivery coordination

  Here's a step-by-step description of the user flow for the specified features, discriminating between user types:

# User Flow

## User Management

1. User enters the application's landing page
2. User selects "Sign Up" or "Login" option

- **For Existing Users (Login):**

  3. User enters credentials
  4. System authenticates and grants access to role-specific dashboard

- **For New Users (Sign Up):**

  3. User fills out registration form with personal details
  4. System presents role selection: Donor, Agent, or Admin
  5. User chooses their role and proceeds
  6. System validates input and creates account
  7. User receives confirmation email
  8. User verifies email and gains access to their dashboard

- **Profile Management (All Users):**

1. User navigates to profile section
2. User can view and edit personal information
3. User saves changes
4. System updates profile information

## Food Donation Management (Donors)

1. Donor logs into their account
2. Donor selects "Log New Donation" option
3. Donor enters surplus food details (type, quantity, expiry)
4. System prompts donor to review food quality and safety guidelines
5. Donor confirms compliance with guidelines
6. System records donation and updates real-time food availability
7. Donor receives confirmation of logged donation

## Recipient (Agent) Features

1. Agent logs into their account
2. Agent views dashboard showing available donations
3. Agent selects a specific donation
4. Agent requests food pickup by clicking "Request Pickup"
5. System prompts agent to choose pickup time
6. Agent selects preferred pickup time
7. System confirms pickup request
8. Agent can view donation history in their profile

## Scheduling System

**For Donors:**

1. Donor receives pickup request notification
2. Donor reviews and approves pickup time or suggests alternatives
3. Donor confirms final pickup schedule

**For Agents:**

4. Agent receives pickup schedule confirmation
5. Agent can view real-time status updates of the donation

**Pickup Process:**

6. Agent arrives at pickup location
7. Donor marks donation as "Picked Up" in the system
8. Agent confirms receipt in the app
9. System updates donation status to "Completed"

**For Admins:**

- Admin can view all scheduled pickups
- Admin can intervene if issues arise (e.g., coordinating alternative delivery options)

## 📝 Documentation

See individual README files in client and server directories for specific instructions.

- [Client Documentation](./client/README.md)
- [Server Documentation](./server/README.md)
- [API Documentation](./server/README.md#api-endpoints)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Your Name - Project Lead - [GitHub Profile](https://github.com/yourusername)

## 📞 Support

For backend-specific issues or questions, please contact:

- Email: support@foodhelpline.com
- GitHub Issues: [Create New Issue](https://github.com/yourusername/food-helpline/issues)
