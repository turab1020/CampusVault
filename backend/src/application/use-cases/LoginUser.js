



import { DomainError } from "../../domain/errors/DomainError";

export class LoginUser {
  constructor(
  userRepo,
  authService,
  tokenService)
  {this.userRepo = userRepo;this.authService = authService;this.tokenService = tokenService;}

  async execute(email, password) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new DomainError("Invalid credentials");
    }

    const isValid = await this.authService.comparePassword(password, user.passwordHash);
    if (!isValid) {
      throw new DomainError("Invalid credentials");
    }

    const token = this.tokenService.generateToken({
      userId: user.id,
      role: user.role
    });

    return { user, token };
  }
}