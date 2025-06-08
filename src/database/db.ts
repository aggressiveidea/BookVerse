import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function connect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env');
  }

  try {
    await mongoose.connect(uri, {
      dbName: 'Books',
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database connection failed', error);
  }
}
