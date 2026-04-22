import { DomainError } from "../errors/DomainError";




export class Listing {
  constructor(
  id,
  hostId,
  title,
  description,
  category,
  dailyRate,
  condition,
  images,
  status = "ACTIVE")
  {this.id = id;this.hostId = hostId;this.title = title;this.description = description;this.category = category;this.dailyRate = dailyRate;this.condition = condition;this.images = images;this.status = status;
    if (dailyRate < 0) {
      throw new DomainError("Daily rate cannot be negative");
    }
  }

  isAvailable() {
    return this.status === "ACTIVE";
  }

  suspend() {
    this.status = "SUSPENDED";
  }

  activate() {
    this.status = "ACTIVE";
  }
}