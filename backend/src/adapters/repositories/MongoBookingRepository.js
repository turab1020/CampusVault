import { Booking } from "../../domain/entities/Booking";

import { BookingModel } from "./schemas/BookingSchema";

export class MongoBookingRepository {
  async save(booking) {
    const doc = new BookingModel({
      _id: booking.id,
      listingId: booking.listingId,
      renterId: booking.renterId,
      hostId: booking.hostId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      totalPrice: booking.totalPrice,
      status: booking.status
    });
    await doc.save();
    return this.mapToEntity(doc);
  }

  async findById(id) {
    const doc = await BookingModel.findById(id);
    return doc ? this.mapToEntity(doc) : null;
  }

  async findByListingId(listingId) {
    const docs = await BookingModel.find({ listingId });
    return docs.map((doc) => this.mapToEntity(doc));
  }

  async findByRenterId(renterId) {
    const docs = await BookingModel.find({ renterId });
    return docs.map((doc) => this.mapToEntity(doc));
  }

  async update(booking) {
    const doc = await BookingModel.findByIdAndUpdate(
      booking.id,
      {
        listingId: booking.listingId,
        renterId: booking.renterId,
        hostId: booking.hostId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        totalPrice: booking.totalPrice,
        status: booking.status
      },
      { new: true }
    );
    if (!doc) throw new Error("Booking not found");
    return this.mapToEntity(doc);
  }

  async findOverlapping(
  listingId,
  startDate,
  endDate)
  {
    const docs = await BookingModel.find({
      listingId,
      // Check for overlap: (StartA < EndB) and (EndA > StartB)
      startDate: { $lt: endDate },
      endDate: { $gt: startDate }
    });
    return docs.map((doc) => this.mapToEntity(doc));
  }

  mapToEntity(doc) {
    return new Booking(
      doc._id.toString(),
      doc.listingId,
      doc.renterId,
      doc.hostId,
      doc.startDate,
      doc.endDate,
      doc.totalPrice,
      doc.status
    );
  }
}