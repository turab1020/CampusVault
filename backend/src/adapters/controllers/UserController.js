


export class UserController {
  constructor(getUser) {this.getUser = getUser;}

  async getById(req, res) {
    try {
      const user = await this.getUser.execute(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Sanitize: remove sensitive data
      // We assume user is a plain object or has public properties we can destructure.
      // If it's a class instance, spreading works for own enumerable properties.
      const { passwordHash, ...publicData } = user;

      return res.json(publicData);
    } catch (err) {
      console.error("Get User Error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}