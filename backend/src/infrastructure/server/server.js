import dotenv from "dotenv";
// CRITICAL: Load env vars BEFORE any imports that read process.env at init time
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "../database/mongoose.js";
import { router } from "./routes.js";

import path from "path";

connectDB();

const app = express();

// Set up strict CORS for production
const allowedOrigins = [
  'https://campus-vault-eight.vercel.app', 
  'https://campusvault-eight.vercel.app',
  'https://campusvault-sight.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: function(origin, callback) {
    // 1. Log the exact origin to the Railway console so we stop guessing
    console.log("Incoming Request Origin:", origin); 
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // 2. Return false instead of throwing a new Error to prevent the 500 Crash
      console.warn("CORS Blocked for origin:", origin);
      callback(null, false); 
    }
  },
  credentials: true
}));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);
app.use(express.json());

// Serve images securely from the backend/images folder
const imagesPath = path.join(process.cwd(), 'images');
console.log(`Serving images from: ${imagesPath}`);
app.use('/images', express.static(imagesPath));

app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});