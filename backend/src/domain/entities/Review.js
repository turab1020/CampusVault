import { DomainError } from "../errors/DomainError.js";

export class Review {
  constructor(
  id,
  bookingId,
  reviewerId, // User who wrote the review
  targetId, // User being reviewed (Host or Renter)
  rating, // 1-5
  comment,
  createdAt = new Date())
  {this.id = id;this.bookingId = bookingId;this.reviewerId = reviewerId;this.targetId = targetId;this.rating = rating;this.comment = comment;this.createdAt = createdAt;
    if (rating < 1 || rating > 5) {
      throw new DomainError("Rating must be between 1 and 5");
    }
    if (!comment || comment.trim().length === 0) {
      throw new DomainError("Comment cannot be empty");
    }
  }
}