

import { DomainError } from "../../domain/errors/DomainError.js";

export class FlagListing {
  constructor(
  listingRepo,
  userRepo)
  {this.listingRepo = listingRepo;this.userRepo = userRepo;}

  async execute(adminId, listingId) {
    const admin = await this.userRepo.findById(adminId);
    if (!admin || !admin.isAdmin()) throw new DomainError("Unauthorized");

    const listing = await this.listingRepo.findById(listingId);
    if (!listing) throw new DomainError("Listing not found");

    listing.suspend(); // Uses domain logic
    await this.listingRepo.update(listing);
  }
}