import jwt from "jsonwebtoken";


export class JwtTokenService {
  constructor(secret) {this.secret = secret;}

  generateToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: "7d" }); // Dev-friendly expiry
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      return null;
    }
  }
}