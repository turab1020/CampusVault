import mongoose, { Schema } from "mongoose";


















const BookingSchema = new Schema(
  {
    listingId: { type: String, required: true, ref: "Listing" },
    renterId: { type: String, required: true, ref: "User" },
    hostId: { type: String, required: true, ref: "User" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: [
      "PENDING",
      "APPROVED",
      "REJECTED",
      "PickedUp",
      "Returned",
      "COMPLETED",
      "CANCELLED"],

      default: "PENDING"
    }
  },
  { timestamps: true }
);

export const BookingModel = mongoose.model("Booking", BookingSchema);