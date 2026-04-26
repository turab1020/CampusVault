


export class GetUser {
  constructor(userRepo) {this.userRepo = userRepo;}

  async execute(id) {
    return await this.userRepo.findById(id);
  }
}