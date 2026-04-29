


import { DomainError } from "../../domain/errors/DomainError.js";

export class ListingController {
  constructor(
  createListing,
  getListings)
  {this.createListing = createListing;this.getListings = getListings;}

  async create(req, res) {
    try {
      // Assuming Auth Middleware adds user to req.user
      const hostId = req.user?.userId;
      if (!hostId) return res.status(401).json({ error: "Unauthorized" });

      const { title, description, category, dailyRate, condition, images } = req.body;

      const listing = await this.createListing.execute(
        hostId,
        title,
        description,
        category,
        Number(dailyRate),
        condition,
        images || []
      );
      res.status(201).json(listing);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(400).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  async getAll(req, res) {
    try {
      const listings = await this.getListings.execute(req.query);
      res.status(200).json(listings);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getById(req, res) {
    try {
      const listing = await this.getListings.getById(req.params.id);
      if (!listing) return res.status(404).json({ error: "Listing not found" });
      res.status(200).json(listing);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}