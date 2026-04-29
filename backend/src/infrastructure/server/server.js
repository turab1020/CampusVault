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
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://campusvault-sight.vercel.app' // Replace with your exact Vercel domain
    : 'http://localhost:5173', // Local Vite development
  credentials: true, // Needed if you plan to use cookies/sessions later
};

app.use(cors(corsOptions));
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