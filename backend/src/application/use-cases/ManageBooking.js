
import { DomainError } from "../../domain/errors/DomainError.js";

export class ManageBooking {
  constructor(bookingRepo) {this.bookingRepo = bookingRepo;}

  async approve(bookingId, hostId) {
    const booking = await this.bookingRepo.findById(bookingId);
    if (!booking) throw new DomainError("Booking not found");
    // Verify host
    if (booking.hostId !== hostId) throw new DomainError("Unauthorized");

    booking.approve();
    await this.bookingRepo.update(booking);
  }

  async reject(bookingId, hostId) {
    const booking = await this.bookingRepo.findById(bookingId);
    if (!booking) throw new DomainError("Booking not found");
    if (booking.hostId !== hostId) throw new DomainError("Unauthorized");

    booking.reject();
    await this.bookingRepo.update(booking);
  }

  async pickup(bookingId, renterId) {
    const booking = await this.bookingRepo.findById(bookingId);
    if (!booking) throw new DomainError("Booking not found");
    // In real world, maybe Host confirms pickup? Or QR code?
    // User requirement: "MarkPickedUp". Who does it? Usually Renter scans, Host confirms.
    // Let's assume Renter triggers it for now, or Host.
    // "MarkPickedUp" - usually Host confirms "I gave it".
    if (booking.hostId !== renterId && booking.renterId !== renterId) {
      throw new DomainError("Unauthorized");
    }
    booking.markPickedUp();
    await this.bookingRepo.update(booking);
  }

  async returnItem(bookingId, userId) {
    const booking = await this.bookingRepo.findById(bookingId);
    if (!booking) throw new DomainError("Booking not found");
    // Renter marks as returned? Or Host marks as received?
    // Usually Host marks as returned (received).
    if (booking.hostId !== userId) throw new DomainError("Only host can confirm return");

    booking.markReturned();
    await this.bookingRepo.update(booking);
  }

  async complete(bookingId, userId) {
    const booking = await this.bookingRepo.findById(bookingId);
    if (!booking) throw new DomainError("Booking not found");
    // Host completes/finalizes
    if (booking.hostId !== userId) throw new DomainError("Unauthorized");

    booking.complete();
    await this.bookingRepo.update(booking);
    // Trust score logic should be triggered here eventually via events
  }
}