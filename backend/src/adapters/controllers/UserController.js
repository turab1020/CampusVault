


export class UserController {
  constructor(getUser, deleteUser, updateProfileUC) {
    this.getUser = getUser;
    this.deleteUser = deleteUser;
    this.updateProfileUC = updateProfileUC;
  }

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

  async deleteMyAccount(req, res) {
    try {
      const userId = req.user.userId;
      
      const user = await this.getUser.execute(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.role === 'ADMIN') {
        return res.status(403).json({ error: "Admin accounts cannot be deleted here" });
      }

      const success = await this.deleteUser.execute(userId);
      if (success) {
        return res.status(200).json({ message: "Account deleted successfully" });
      } else {
        return res.status(400).json({ error: "Failed to delete account" });
      }
    } catch (err) {
      console.error("Delete User Error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateProfile(req, res) {
    try {
      const userId = req.user.userId;
      const { name, avatarRef } = req.body;
      
      const updatedUser = await this.updateProfileUC.execute(userId, { name, avatarRef });
      
      const { passwordHash, ...publicData } = updatedUser;
      return res.json(publicData);
    } catch (err) {
      console.error("Update Profile Error:", err);
      return res.status(500).json({ error: err.message || "Internal server error" });
    }
  }

  async uploadAvatar(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Return the filename to be stored in the user profile
      return res.json({ 
        avatarRef: req.file.filename,
        url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      });
    } catch (err) {
      console.error("Upload Avatar Error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}