import mongoose, { Schema } from "mongoose";









const ReviewSchema = new Schema(
  {
    bookingId: { type: String, required: true, ref: "Booking" },
    reviewerId: { type: String, required: true, ref: "User" },
    targetId: { type: String, required: true, ref: "User" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
  },
  { timestamps: true }
);

export const ReviewModel = mongoose.model("Review", ReviewSchema);