import { User } from "../../domain/entities/User.js";

import { UserModel } from "./schemas/UserSchema.js";

export class MongoUserRepository {
  async save(user) {
    const userDoc = new UserModel({
      // Let Mongoose auto-generate _id (ObjectId) instead of using crypto.randomUUID()
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
      trustScore: user.trustScore,
      completedTransactions: user.completedTransactions,
      cancelledBookings: user.cancelledBookings,
      averageRating: user.averageRating,
      profile: user.profile
    });
    await userDoc.save();
    return this.mapToEntity(userDoc);
  }

  async findByEmail(email) {
    const doc = await UserModel.findOne({ email });
    return doc ? this.mapToEntity(doc) : null;
  }

  async findById(id) {
    const doc = await UserModel.findById(id);
    return doc ? this.mapToEntity(doc) : null;
  }

  async update(user) {
    const doc = await UserModel.findByIdAndUpdate(
      user.id,
      {
        email: user.email,
        passwordHash: user.passwordHash,
        role: user.role,
        trustScore: user.trustScore,
        completedTransactions: user.completedTransactions,
        cancelledBookings: user.cancelledBookings,
        averageRating: user.averageRating,
        profile: user.profile
      },
      { new: true }
    );
    if (!doc) throw new Error("User not found for update");
    return this.mapToEntity(doc);
  }

  mapToEntity(doc) {
    return new User(
      doc._id.toString(),
      doc.email,
      doc.passwordHash,
      doc.role,
      doc.trustScore,
      doc.completedTransactions,
      doc.cancelledBookings,
      doc.averageRating,
      doc.profile
    );
  }

  async deleteById(id) {
    const doc = await UserModel.findByIdAndDelete(id);
    return doc ? true : false;
  }
}