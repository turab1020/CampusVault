import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { UserModel } from "../../adapters/repositories/schemas/UserSchema.js";
import { ListingModel } from "../../adapters/repositories/schemas/ListingSchema.js";
import { BookingModel } from "../../adapters/repositories/schemas/BookingSchema.js";
import { ReviewModel } from "../../adapters/repositories/schemas/ReviewSchema.js";
import { BCryptAuthService } from "../../adapters/services/BCryptAuthService.js";

dotenv.config();

const authService = new BCryptAuthService();

const CATEGORIES = [
"Electronics",
"Engineering Kits",
"Media Equipment",
"Event Gear",
"Textbooks",
"Computing",
"Presentation Tools"];


const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/campusvault");
    console.log("Connected to MongoDB for Seeding");

    // Clear existing data
    await UserModel.deleteMany({});
    await ListingModel.deleteMany({});
    await BookingModel.deleteMany({});
    await ReviewModel.deleteMany({});
    console.log("Cleared existing data");

    // Create Users
    const passwordHash = await authService.hashPassword("password123");

    const admin = await UserModel.create({
      email: "admin@campusvault.com",
      passwordHash,
      role: "ADMIN",
      profile: { name: "System Admin" },
      trustScore: 100
    });

    const students = [];
    for (let i = 1; i <= 5; i++) {
      students.push(
        await UserModel.create({
          email: `student${i}`,
          passwordHash,
          role: "STUDENT",
          profile: { name: `Student ${i}` },
          trustScore: 50 + i * 5
        })
      );
    }
    console.log(`Created 1 Admin and ${students.length} Students`);

    // Load Images Dynamically
    const imagesDir = path.join(process.cwd(), "images");
    let imageFiles = [];

    try {
      if (fs.existsSync(imagesDir)) {
        imageFiles = fs.readdirSync(imagesDir).filter((file) => {
          return /\.(png|jpg|jpeg|gif)$/i.test(file);
        });
        console.log(`Found ${imageFiles.length} images in ${imagesDir}`);
      } else {
        console.warn(`Images directory not found at: ${imagesDir}`);
      }
    } catch (err) {
      console.error("Error reading images directory:", err);
    }

    // Create Listings if images exist, else fallback to placeholders? 
    // User requested dynamic seeding based on file list, so we stick to the file list.
    const listings = [];

    if (imageFiles.length > 0) {
      for (const imageFile of imageFiles) {
        const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
        const host = students[Math.floor(Math.random() * students.length)];

        // transform filename to title: "arduino_mega_kit.png" -> "Arduino Mega Kit"
        const nameWithoutExt = path.parse(imageFile).name;
        const title = nameWithoutExt.
        split(/[_-]/).
        map((word) => word.charAt(0).toUpperCase() + word.slice(1)).
        join(" ");

        listings.push({
          hostId: host._id.toString(),
          title: title,
          description: `High quality ${title} available for rent. Perfect for your campus needs.`,
          category,
          dailyRate: Math.floor(Math.random() * 50) + 10,
          condition: ["NEW", "GOOD", "FAIR"][Math.floor(Math.random() * 3)],
          images: [`/images/${imageFile}`], // Path for frontend to access
          status: "ACTIVE"
        });
      }
    } else {
      console.log("No images found to seed listings with.");
    }

    if (listings.length > 0) {
      await ListingModel.insertMany(listings);
      console.log(`Created ${listings.length} Listings from images`);
    }

    console.log("Seeding Complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding Failed:", error);
    process.exit(1);
  }
};

seed();