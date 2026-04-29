import { Review } from "../../domain/entities/Review.js";

import { ReviewModel } from "./schemas/ReviewSchema.js";

export class MongoReviewRepository {
  async save(review) {
    const doc = new ReviewModel({
      _id: review.id,
      bookingId: review.bookingId,
      reviewerId: review.reviewerId,
      targetId: review.targetId,
      rating: review.rating,
      comment: review.comment
    });
    await doc.save();
    return this.mapToEntity(doc);
  }

  async findByTargetId(targetId) {
    const docs = await ReviewModel.find({ targetId });
    return docs.map((doc) => this.mapToEntity(doc));
  }

  async findByBookingId(bookingId) {
    const doc = await ReviewModel.findOne({ bookingId });
    return doc ? this.mapToEntity(doc) : null;
  }

  mapToEntity(doc) {
    return new Review(
      doc._id.toString(),
      doc.bookingId,
      doc.reviewerId,
      doc.targetId,
      doc.rating,
      doc.comment,
      doc.createdAt
    );
  }
}