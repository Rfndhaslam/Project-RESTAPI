const db = require('../config/database');

const getUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  console.log('Rows:', rows); // ← cek rows saja
  return rows; // ← return rows, bukan result
};

const createUser = async (body) => {
  const [result] = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [body.name, body.email, body.password]);
  return result;
};

module.exports = { getUserByEmail, createUser };
