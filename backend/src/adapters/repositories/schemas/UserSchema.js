import mongoose, { Schema } from "mongoose";















const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["STUDENT", "ADMIN"], default: "STUDENT" },
    trustScore: { type: Number, default: 50, min: 0, max: 100 },
    completedTransactions: { type: Number, default: 0 },
    cancelledBookings: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    profile: {
      name: { type: String, required: true },
      avatarRef: { type: String }
    }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);