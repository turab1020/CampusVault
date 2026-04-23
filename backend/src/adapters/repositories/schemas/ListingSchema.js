import mongoose, { Schema } from "mongoose";












const ListingSchema = new Schema(
  {
    hostId: { type: String, required: true, ref: "User" }, // Using String ID for simplicity in Hex/Clean Arch or ObjectId? Domain uses string. Keeping it flexible.
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    dailyRate: { type: Number, required: true, min: 0 },
    condition: { type: String, enum: ["NEW", "GOOD", "FAIR"], required: true },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED", "UNAVAILABLE"],
      default: "ACTIVE"
    }
  },
  { timestamps: true }
);

export const ListingModel = mongoose.model("Listing", ListingSchema);