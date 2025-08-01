const pool = require('./index');

class ProgressModel {
  static async getUserProgress(userId) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT * FROM progress WHERE user_id = ?', [userId]);
      return rows;
    } finally {
      if (conn) conn.release();
    }
  }

  static async updateUserProgress(userId, lesson, status) {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query(
        `INSERT INTO progress (user_id, lesson, status)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE status = ?`,
        [userId, lesson, status, status]
      );
    } finally {
      if (conn) conn.release();
    }
  }
}

module.exports = ProgressModel;