import mongoose from "mongoose";

export const connectDB = async () => {
  // Fail fast and loud in production if the URI is missing
  if (process.env.NODE_ENV === 'production' && !process.env.MONGO_URI) {
    console.error("🚨 CRITICAL FATAL ERROR: MONGO_URI is not defined in the environment variables.");
    process.exit(1); 
  }

  const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/campusvault';

  try {
    await mongoose.connect(dbURI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};