import { DomainError } from "../../domain/errors/DomainError.js";

export class UpdateProfile {
  constructor(userRepo, authService) {
    this.userRepo = userRepo;
    this.authService = authService;
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

    // Update password if provided
    if (profileData.password) {
      user.passwordHash = await this.authService.hashPassword(profileData.password);
    }

    return await this.userRepo.update(user);
  }
}
