const pool = require('./index');

class BadgeModel {
  static async awardBadge(userId, badgeName) {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query(
        'INSERT INTO badges (user_id, badge_name) VALUES (?, ?)', [userId, badgeName]
      );
    } finally {
      if (conn) conn.release();
    }
  }

  static async getUserBadges(userId) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT * FROM badges WHERE user_id = ?', [userId]);
      return rows;
    } finally {
      if (conn) conn.release();
    }
  }
}

module.exports = BadgeModel;