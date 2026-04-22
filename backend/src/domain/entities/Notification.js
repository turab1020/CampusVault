






export class Notification {
  constructor(
  id,
  userId, // Recipient
  type,
  message,
  isRead = false,
  createdAt = new Date(),
  metadata // Flexible for linking to bookings/listings
  ) {this.id = id;this.userId = userId;this.type = type;this.message = message;this.isRead = isRead;this.createdAt = createdAt;this.metadata = metadata;}

  markAsRead() {
    this.isRead = true;
  }
}