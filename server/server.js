import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodHelpline');
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  }
};

connectDB();

// MongoDB event handlers
mongoose.connection
  .on('error', err => console.error('MongoDB connection error:', err))
  .on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    setTimeout(connectDB, 5000);
  });

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

// Routes
app.use('/api/users', userRoutes);
app.get('/', (req, res) => res.send('Food Helpline API is running'));

// Enhanced error handling middleware
app.use((err, req, res, next) => {
    // Log error details
    console.error('\x1b[31m%s\x1b[0m', '🚨 Error:', {
        timestamp: new Date().toISOString(),
        path: req.path,
        method: req.method,
        error: {
            name: err.name,
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        },
        body: req.body,
        query: req.query,
        params: req.params
    });

    // Send error response
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : undefined
    });
});

// Catch unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('\x1b[31m%s\x1b[0m', '⚠️ Unhandled Rejection:', {
        timestamp: new Date().toISOString(),
        reason: reason,
        promise: promise
    });
});

// Catch uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('\x1b[31m%s\x1b[0m', '💥 Uncaught Exception:', {
        timestamp: new Date().toISOString(),
        error: {
            name: error.name,
            message: error.message,
            stack: error.stack
        }
    });
    // Give the server time to finish ongoing requests before exiting
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));