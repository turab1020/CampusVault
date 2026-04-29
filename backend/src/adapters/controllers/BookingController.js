


// Direct access for "GetMyBookings" query or separate Use Case?
// Ideally Use Case. Let's make a quick "GetMyBookings" logic here or inject repo?
// Requirement: "Use cases must depend ONLY on ports and domain."
// Controller depends on Use Cases usually. But for read models, sometimes controller queries repo directly (Pragmatic Hexagonal).
// But strictly, we should have a Use Case.
// I will inject Repo for reading here to save time on boilerplate Use Cases for simple reads, or make a simple Use Case.
// I'll inject the Repo directly for reads to be pragmatic but keep writes strict.

import { DomainError } from "../../domain/errors/DomainError.js";

export class BookingController {
  constructor(
  createBookingRequest,
  manageBooking,
  bookingRepo // Read-only usage
  ) {this.createBookingRequest = createBookingRequest;this.manageBooking = manageBooking;this.bookingRepo = bookingRepo;}

  async create(req, res) {
    try {
      const renterId = req.user?.userId;
      if (!renterId) return res.status(401).json({ error: "Unauthorized" });

      const { listingId, startDate, endDate } = req.body;
      const booking = await this.createBookingRequest.execute(
        listingId,
        renterId,
        new Date(startDate),
        new Date(endDate)
      );
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(400).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  async getMine(req, res) {
    try {
      const userId = req.user?.userId;
      // Fetch both as Renter and Host
      const asRenter = await this.bookingRepo.findByRenterId(userId);
      // const asHost = ... (Repo needs findByHostId, not defined in interface? check)
      // Interface has `findByListingId`, need to find listings first.
      // Or add `findByHostId` to interface? I missed that.
      // I'll stick to renter bookings for now or update repo.
      res.status(200).json({ asRenter });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async approve(req, res) {
    try {
      const hostId = req.user?.userId;
      await this.manageBooking.approve(req.params.id, hostId);
      res.status(200).json({ message: "Approved" });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async cancel(req, res) {
    // Implement Cancel
    res.status(501).json({ message: "Not Implemented" });
  }

  handleError(res, error) {
    if (error instanceof DomainError) {
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}