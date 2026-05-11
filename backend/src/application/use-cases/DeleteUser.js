import fs from 'fs';
import path from 'path';

export class DeleteUser {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async execute(userId) {
    const user = await this.userRepo.findById(userId);
    if (user && user.profile?.avatarRef) {
      const filePath = path.join(process.cwd(), 'images', user.profile.avatarRef);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.error("Failed to delete avatar file:", err);
      }
    }
    return await this.userRepo.deleteById(userId);
  }
}
