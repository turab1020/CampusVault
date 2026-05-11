import { DomainError } from "../../domain/errors/DomainError.js";

export class UpdateProfile {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async execute(userId, profileData) {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new DomainError("User not found");
    }

    // Update profile fields
    if (profileData.name) {
      user.profile.name = profileData.name;
    }
    
    if (profileData.avatarRef !== undefined) {
      user.profile.avatarRef = profileData.avatarRef;
    }

    return await this.userRepo.update(user);
  }
}
