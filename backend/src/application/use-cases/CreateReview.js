import { Review } from "../../domain/entities/Review.js";


import { DomainError } from "../../domain/errors/DomainError.js";

export class CreateReview {
  constructor(
  reviewRepo,
  bookingRepo)
  {this.reviewRepo = reviewRepo;this.bookingRepo = bookingRepo;}

  async execute(
  bookingId,
  reviewerId,
  rating,
  comment)
  {
    const booking = await this.bookingRepo.findById(bookingId);
    if (!booking) throw new DomainError("Booking not found");

    if (booking.status !== "COMPLETED") {
      // Typically reviews happen after completion.
      throw new DomainError("Booking must be completed to leave a review");
    }

    if (booking.renterId !== reviewerId && booking.hostId !== reviewerId) {
      throw new DomainError("Unauthorized to review this booking");
    }

    // Determine target
    const targetId = reviewerId === booking.renterId ? booking.hostId : booking.renterId;

    // Check if review already exists
    const existing = await this.reviewRepo.findByBookingId(bookingId);
    if (existing && existing.reviewerId === reviewerId) {
      throw new DomainError("Review already submitted");
    }

    // Create Review
    const review = new Review(
      crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
      bookingId,
      reviewerId,
      targetId,
      rating,
      comment
    );

    return await this.reviewRepo.save(review);
  }
}