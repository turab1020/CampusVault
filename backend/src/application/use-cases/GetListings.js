


export class GetListings {
  constructor(listingRepo) {this.listingRepo = listingRepo;}

  async execute(filter) {
    return await this.listingRepo.findAll(filter);
  }

  async getById(id) {
    return await this.listingRepo.findById(id);
  }
}