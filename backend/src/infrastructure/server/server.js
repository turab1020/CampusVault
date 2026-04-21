import dotenv from "dotenv";
// CRITICAL: Load env vars BEFORE any imports that read process.env at init time
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectDB } from "../database/mongoose";
import { router } from "./routes";

import path from "path";

connectDB();

const app = express();

app.use(cors());
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