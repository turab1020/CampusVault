


import { DomainError } from "../../domain/errors/DomainError";

export class AuthController {
  constructor(
  registerUser,
  loginUser)
  {this.registerUser = registerUser;this.loginUser = loginUser;}

  async register(req, res) {
    try {
      const { email, password, name } = req.body;
      const user = await this.registerUser.execute(email, password, name);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUser.execute(email, password);

      // HttpOnly Cookie for Refresh Token (future), just JSON for now per requirements
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
}