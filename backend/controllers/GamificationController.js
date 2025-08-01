const GamificationModel = require('../db/GamificationModel');
const BadgeModel = require('../db/BadgeModel');

class GamificationController {
  static async awardPointsAndBadges(userId, action) {
    // Example gamification rules
    let points = 0;
    let badge = null;

    switch (action) {
      case 'lesson_completed':
        points = 10;
        badge = 'Lesson Finisher';
        break;
      case 'daily_streak':
        points = 5;
        badge = 'Daily Streak';
        break;
      case 'perfect_answer':
        points = 15;
        badge = 'Quiz Master';
        break;
      default:
        points = 1;
        break;
    }

    await GamificationModel.addPoints(userId, points);
    if (badge) {
      await BadgeModel.awardBadge(userId, badge);
    }
    return { points, badge };
  }
}

module.exports = GamificationController;