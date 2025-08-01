const pool = require('./index');

class UserModel {
  static async getUserByUsername(username) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT * FROM users WHERE username = ?', [username]);
      return rows[0];
    } finally {
      if (conn) conn.release();
    }
  }

  static async createUser(username, email) {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query(
        'INSERT INTO users (username, email) VALUES (?, ?)', [username, email]
      );
      // Always return insertId as string for JSON compatibility
      return typeof res.insertId === 'bigint' ? res.insertId.toString() : res.insertId;
    } finally {
      if (conn) conn.release();
    }
  }
}

module.exports = UserModel;