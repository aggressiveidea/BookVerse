import express from 'express';
import dotenv from 'dotenv';
import { connect } from './database/db'; // Adjust path if needed

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connect(); // Connect to MongoDB first
    app.listen(PORT, () => {
      console.log(`Server's running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();
