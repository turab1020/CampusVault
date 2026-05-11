import { User } from "../../domain/entities/User.js";
import crypto from 'crypto';


import { DomainError } from "../../domain/errors/DomainError.js";

export class RegisterUser {
  constructor(
  userRepo,
  authService)
  {this.userRepo = userRepo;this.authService = authService;}

  async execute(email, password, name) {
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new DomainError("User already exists");
    }

    const passwordHash = await this.authService.hashPassword(password);

    // Create new User entity (Framework agnostic)
    const newUser = new User(
      crypto.randomUUID(),
      email,
      passwordHash,
      "STUDENT", // Default role
      50, 0, 0, 0, // Default scores
      { name }
    );

    return await this.userRepo.save(newUser);
  }
}