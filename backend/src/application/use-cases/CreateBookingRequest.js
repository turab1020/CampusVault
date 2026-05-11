import { Booking } from "../../domain/entities/Booking.js";
import crypto from 'crypto';


import { DomainError } from "../../domain/errors/DomainError.js";

export class CreateBookingRequest {
  constructor(
  bookingRepo,
  listingRepo)
  {this.bookingRepo = bookingRepo;this.listingRepo = listingRepo;}

  async execute(
  listingId,
  renterId,
  startDate,
  endDate)
  {
    const listing = await this.listingRepo.findById(listingId);
    if (!listing) {
      throw new DomainError("Listing not found");
    }

    if (!listing.isAvailable()) {
      throw new DomainError("Listing is not available");
    }

    if (listing.hostId === renterId) {
      throw new DomainError("Cannot rent your own listing");
    }

    // Check overlaps
    // Logic: Find all approved/active bookings for this listing and check overlap.
    // However, repository should handle query efficiency.
    // But domain logic says "Booking Check".
    // I defined `findOverlapping` in BookingRepository.

    // IMPORTANT: Only check against APPROVED or ACTIVE bookings.
    // Pending bookings don't block availability yet (User choice).
    // Actually, usually we might want to block dates pending approval?
    // User request said: "Booking conflict prevention logic".
    // Let's assume we check for confirmed overlaps.

    const conflicts = await this.bookingRepo.findOverlapping(listingId, startDate, endDate);
    // Filter for blocking statuses
    const blockingConflicts = conflicts.filter((b) =>
    ["APPROVED", "PickedUp", "Returned", "COMPLETED"].includes(b.status)
    );

    if (blockingConflicts.length > 0) {
      throw new DomainError("Listing is already booked for these dates");
    }

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const totalPrice = days * listing.dailyRate;

    const booking = new Booking(
      crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
      listingId,
      renterId,
      listing.hostId,
      startDate,
      endDate,
      totalPrice,
      "PENDING"
    );

    return await this.bookingRepo.save(booking);
  }
}