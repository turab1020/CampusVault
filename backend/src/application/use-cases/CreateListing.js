import { Listing } from "../../domain/entities/Listing.js";


export class CreateListing {
  constructor(listingRepo) {this.listingRepo = listingRepo;}

  async execute(
  hostId,
  title,
  description,
  category,
  dailyRate,
  condition,
  images)
  {
    const listing = new Listing(
      crypto.randomUUID(),
      hostId,
      title,
      description,
      category,
      dailyRate,
      condition,
      images
    );

    return await this.listingRepo.save(listing);
  }
}