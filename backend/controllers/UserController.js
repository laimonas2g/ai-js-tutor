const UserModel = require('../db/UserModel');
const ProgressModel = require('../db/ProgressModel');
const GamificationController = require('./GamificationController');
const BadgeModel = require('../db/BadgeModel');
const GamificationModel = require('../db/GamificationModel');

class UserController {
  static async register(req, res) {
    const { username, email } = req.body;
    try {
      let userId = await UserModel.createUser(username, email);

      // Extra safety for BigInt return
      if (typeof userId === 'bigint') {
        userId = userId.toString();
      }

      res.json({ userId });
    } catch (error) {
      // Log the full error object for debugging
      console.error('Registration error object:', error);

      // Simplified duplicate detection for MariaDB driver
      if (error.message && error.message.includes('Duplicate entry')) {
        res.status(409).json({ error: 'Username already exists. Please choose another.' });
      } else {
        res.status(500).json({ error: 'User registration failed', details: error.message });
      }
    }
  }

  static async completeLesson(req, res) {
    const { userId, lesson } = req.body;
    try {
      await ProgressModel.updateUserProgress(userId, lesson, 'completed');
      const gamification = await GamificationController.awardPointsAndBadges(userId, 'lesson_completed');
      res.json({ message: 'Lesson marked as complete!', ...gamification });
    } catch (error) {
      res.status(500).json({ error: 'Lesson completion failed', details: error.message });
    }
  }

  static async getProgress(req, res) {
    const { userId } = req.params;
    try {
      const progress = await ProgressModel.getUserProgress(userId);
      res.json({ progress });
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch progress', details: error.message });
    }
  }

  static async getBadges(req, res) {
    const { userId } = req.params;
    try {
      const badges = await BadgeModel.getUserBadges(userId);
      res.json({ badges });
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch badges', details: error.message });
    }
  }

  static async getPoints(req, res) {
    const { userId } = req.params;
    try {
      const points = await GamificationModel.getPoints(userId);
      res.json({ points });
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch points', details: error.message });
    }
  }
}

module.exports = UserController;