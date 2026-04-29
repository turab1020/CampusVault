import { DomainError } from "../errors/DomainError.js";

// PENDING -> APPROVED/REJECTED
// APPROVED -> ACTIVE (Date Reached) -> COMPLETED
// ANY -> CANCELLED










export class Booking {
  constructor(
  id,
  listingId,
  renterId,
  hostId,
  startDate,
  endDate,
  totalPrice,
  status = "PENDING",
  createdAt = new Date())
  {this.id = id;this.listingId = listingId;this.renterId = renterId;this.hostId = hostId;this.startDate = startDate;this.endDate = endDate;this.totalPrice = totalPrice;this.status = status;this.createdAt = createdAt;
    if (startDate >= endDate) {
      throw new DomainError("Start date must be before end date");
    }
    if (totalPrice < 0) {
      throw new DomainError("Total price cannot be negative");
    }
  }

  // State Transitions
  approve() {
    if (this.status !== "PENDING") {
      throw new DomainError("Can only approve pending bookings");
    }
    this.status = "APPROVED";
  }

  reject() {
    if (this.status !== "PENDING") {
      throw new DomainError("Can only reject pending bookings");
    }
    this.status = "REJECTED";
  }

  markPickedUp() {
    if (this.status !== "APPROVED") {
      throw new DomainError("Cannot pick up a booking that is not approved");
    }
    this.status = "PickedUp";
  }

  markReturned() {
    if (this.status !== "PickedUp") {
      throw new DomainError("Cannot return a booking that was not picked up");
    }
    this.status = "Returned";
  }

  complete() {
    if (this.status !== "Returned") {
      throw new DomainError("Cannot complete a booking that has not been returned");
    }
    this.status = "COMPLETED";
  }

  cancel() {
    if (["COMPLETED", "REJECTED", "CANCELLED"].includes(this.status)) {
      throw new DomainError("Cannot cancel a completed or already finalized booking");
    }
    this.status = "CANCELLED";
  }

  // Conflict Logic helper
  overlaps(otherStart, otherEnd) {
    return this.startDate < otherEnd && this.endDate > otherStart;
  }
}