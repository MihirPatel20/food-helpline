# Food Helpline Project

A full-stack web application to minimize food waste by connecting food donors with NGOs and food banks.

## 🌟 Overview

Food Helpline is a platform that helps reduce food waste by creating an efficient system for food donation and distribution. It connects restaurants, event organizers, and individuals who have surplus food with NGOs and food banks that can distribute it to those in need.

## 🚀 Features

- **User Management**
  - Role-based authentication (donors, recipients, admins)
  - Secure login and registration
  - Profile management

- **Food Donation Management**
  - Log surplus food details
  - Real-time food availability tracking
  - Food quality and safety guidelines

- **Recipient Features**
  - Search available donations
  - Request food pickup
  - Track donation history

- **Scheduling System**
  - Flexible pickup scheduling
  - Real-time status updates
  - Delivery coordination

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

## 📂 Project Structure

```
food-helpline/
├── client/           # Frontend application
├── server/           # Backend API server
└── README.md         # This file
```

See individual README files in client and server directories for specific setup instructions.

## 🔧 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/food-helpline.git
   cd food-helpline
   ```

2. **Set up the server**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Set up the client**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3000

## 📝 Documentation

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

For support, email support@foodhelpline.com or join our Slack channel. 