



export class User {
  constructor(
  id,
  email,
  passwordHash,
  role,
  trustScore = 50,
  completedTransactions = 0,
  cancelledBookings = 0, // bookings cancelled by this user
  averageRating = 0, // derived from reviews
  profile)



  {this.id = id;this.email = email;this.passwordHash = passwordHash;this.role = role;this.trustScore = trustScore;this.completedTransactions = completedTransactions;this.cancelledBookings = cancelledBookings;this.averageRating = averageRating;this.profile = profile;
    if (this.trustScore < 0) this.trustScore = 0;
    if (this.trustScore > 100) this.trustScore = 100;
  }

  // Domain Logic: Update Trust Score
  recalculateTrustScore() {
    // Base Score (50)
    // + (Completed Transactions * 2)
    // + (Average Review Rating - 3) * 10
    // - (Cancelled Bookings by User * 5)

    let score = 50;
    score += this.completedTransactions * 2;
    score += (this.averageRating - 3) * 10;
    score -= this.cancelledBookings * 5;

    // Cap: 0-100
    this.trustScore = Math.max(0, Math.min(100, score));
  }

  isAdmin() {
    return this.role === "ADMIN";
  }
}