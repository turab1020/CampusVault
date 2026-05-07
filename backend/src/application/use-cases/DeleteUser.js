export class DeleteUser {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async execute(userId) {
    return await this.userRepo.deleteById(userId);
  }
}
