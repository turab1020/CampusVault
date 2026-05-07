


import { DomainError } from "../../domain/errors/DomainError.js";

export class AdminController {
  constructor(suspendUser, flagListing, unflagListing) {
    this.suspendUser = suspendUser;
    this.flagListing = flagListing;
    this.unflagListing = unflagListing;
  }

  async suspendUserAction(req, res) {
    try {
      const adminId = req.user?.userId;
      await this.suspendUser.execute(adminId, req.params.id);
      res.status(200).json({ message: "User suspended" });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async flagListingAction(req, res) {
    try {
      const adminId = req.user?.userId;
      await this.flagListing.execute(adminId, req.params.id);
      res.status(200).json({ message: "Listing flagged/suspended" });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async unflagListingAction(req, res) {
    try {
      const adminId = req.user?.userId;
      await this.unflagListing.execute(adminId, req.params.id);
      res.status(200).json({ message: "Listing unflagged and active" });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  handleError(res, error) {
    if (error instanceof DomainError) {
      res.status(403).json({ error: error.message }); // Admin errors are usually Forbidden or Bad Request
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}