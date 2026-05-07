


import { DomainError } from "../../domain/errors/DomainError.js";

export class AuthController {
  constructor(
  registerUser,
  loginUser,
  getUser)
  {this.registerUser = registerUser;this.loginUser = loginUser;this.getUser = getUser;}

  async getMe(req, res) {
    try {
      const user = await this.getUser.execute(req.user.userId);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.status(200).json(this.toResponse(user));
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async register(req, res) {
    try {
      const { email, password, name } = req.body;
      const user = await this.registerUser.execute(email, password, name);
      res.status(201).json(this.toResponse(user));
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(400).json({ error: error.message });
      } else {
        console.error("Register Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUser.execute(email, password);

      res.status(200).json({
        token: result.token,
        user: this.toResponse(result.user)
      });
    } catch (error) {
      if (error instanceof DomainError) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  toResponse(user) {
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}