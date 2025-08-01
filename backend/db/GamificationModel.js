const pool = require('./index');

class GamificationModel {
  static async addPoints(userId, points) {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query(
        `UPDATE users SET points = points + ? WHERE id = ?`, [points, userId]
      );
    } finally {
      if (conn) conn.release();
    }
  }

  static async getPoints(userId) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        `SELECT points FROM users WHERE id = ?`, [userId]
      );
      return rows[0]?.points || 0;
    } finally {
      if (conn) conn.release();
    }
  }
}

module.exports = GamificationModel;