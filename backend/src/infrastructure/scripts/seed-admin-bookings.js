import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserModel } from "../../adapters/repositories/schemas/UserSchema";
import { ListingModel } from "../../adapters/repositories/schemas/ListingSchema";
import { BookingModel } from "../../adapters/repositories/schemas/BookingSchema";

dotenv.config();

const seedAdminBookings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/campusvault");
    console.log("Connected to MongoDB");

    // Find admin user
    const admin = await UserModel.findOne({ email: "admin@campusvault.com" });
    if (!admin) {
      console.error("Admin user not found! Run the main seed first.");
      process.exit(1);
    }
    console.log(`Found admin: ${admin._id}`);

    // Get some listings (pick ones NOT hosted by admin for realism)
    const listings = await ListingModel.find({ hostId: { $ne: admin._id.toString() } }).limit(5);
    if (listings.length === 0) {
      console.error("No listings found! Run the main seed first.");
      process.exit(1);
    }
    console.log(`Found ${listings.length} listings to book`);

    const adminId = admin._id.toString();

    const bookings = [
    {
      listingId: listings[0]._id.toString(),
      renterId: adminId,
      hostId: listings[0].hostId,
      startDate: new Date("2026-02-01"),
      endDate: new Date("2026-02-05"),
      totalPrice: listings[0].dailyRate * 4,
      status: "COMPLETED"
    },
    {
      listingId: listings[1 % listings.length]._id.toString(),
      renterId: adminId,
      hostId: listings[1 % listings.length].hostId,
      startDate: new Date("2026-02-10"),
      endDate: new Date("2026-02-14"),
      totalPrice: listings[1 % listings.length].dailyRate * 4,
      status: "COMPLETED"
    },
    {
      listingId: listings[2 % listings.length]._id.toString(),
      renterId: adminId,
      hostId: listings[2 % listings.length].hostId,
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-03-07"),
      totalPrice: listings[2 % listings.length].dailyRate * 6,
      status: "APPROVED"
    },
    {
      listingId: listings[3 % listings.length]._id.toString(),
      renterId: adminId,
      hostId: listings[3 % listings.length].hostId,
      startDate: new Date("2026-03-15"),
      endDate: new Date("2026-03-20"),
      totalPrice: listings[3 % listings.length].dailyRate * 5,
      status: "PENDING"
    },
    {
      listingId: listings[4 % listings.length]._id.toString(),
      renterId: adminId,
      hostId: listings[4 % listings.length].hostId,
      startDate: new Date("2026-01-20"),
      endDate: new Date("2026-01-25"),
      totalPrice: listings[4 % listings.length].dailyRate * 5,
      status: "CANCELLED"
    }];


    await BookingModel.insertMany(bookings);
    console.log(`✅ Created ${bookings.length} bookings for admin@campusvault.com`);
    console.log("Statuses: COMPLETED x2, APPROVED x1, PENDING x1, CANCELLED x1");

    process.exit(0);
  } catch (error) {
    console.error("Seeding Failed:", error);
    process.exit(1);
  }
};

seedAdminBookings();