import { Listing } from "../../domain/entities/Listing.js";

import { ListingModel } from "./schemas/ListingSchema.js";

export class MongoListingRepository {
  async save(listing) {
    const doc = new ListingModel({
      // Let Mongoose auto-generate _id (ObjectId)
      hostId: listing.hostId,
      title: listing.title,
      description: listing.description,
      category: listing.category,
      dailyRate: listing.dailyRate,
      condition: listing.condition,
      images: listing.images,
      status: listing.status
    });
    await doc.save();
    return this.mapToEntity(doc);
  }

  async findById(id) {
    const doc = await ListingModel.findById(id);
    return doc ? this.mapToEntity(doc) : null;
  }

  async findAll(filter) {
    const { limit, offset, category, status, hostId } = filter || {};
    
    // Whitelist allowed query parameters to prevent NoSQL injection
    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;
    if (hostId) query.hostId = hostId;

    const queryBuilder = ListingModel.find(query);

    if (limit) {
      queryBuilder.limit(Number(limit));
    }
    if (offset) {
      queryBuilder.skip(Number(offset));
    }

    const docs = await queryBuilder.exec();
    return docs.map((newDoc) => this.mapToEntity(newDoc));
  }

  async update(listing) {
    const doc = await ListingModel.findByIdAndUpdate(
      listing.id,
      {
        hostId: listing.hostId,
        title: listing.title,
        description: listing.description,
        category: listing.category,
        dailyRate: listing.dailyRate,
        condition: listing.condition,
        images: listing.images,
        status: listing.status
      },
      { new: true }
    );
    if (!doc) throw new Error("Listing not found");
    return this.mapToEntity(doc);
  }

  async delete(id) {
    await ListingModel.findByIdAndDelete(id);
  }

  mapToEntity(doc) {
    return new Listing(
      doc._id.toString(),
      doc.hostId,
      doc.title,
      doc.description,
      doc.category,
      doc.dailyRate,
      doc.condition,
      doc.images,
      doc.status
    );
  }
}