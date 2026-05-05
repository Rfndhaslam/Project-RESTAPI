const db = require('../config/databases');

const getAllCategories = () => db.query('SELECT * FROM categories');

const getCategoryById = (id) => db.query('SELECT * FROM categories WHERE id = ?', [id]);

const createCategory = (body) => db.query('INSERT INTO categories (name, description) VALUES (?, ?)', [body.name, body.description]);

const updateCategory = (id, body) => db.query('UPDATE categories SET name = ?, description = ? WHERE id = ?', [body.name, body.description, id]);

const updatePartialCategory = (id, body) => {
  const fields = [];
  const values = [];
  if (body.name) {
    fields.push('name = ?');
    values.push(body.name);
  }
  if (body.description) {
    fields.push('description = ?');
    values.push(body.description);
  }
  if (fields.length === 0) {
    throw new Error('No valid fields to update');
  }
  values.push(id);
  return db.query(`UPDATE categories SET ${fields.join(', ')} WHERE id = ?`, values);
};

const deleteCategory = (id) => db.query('DELETE FROM categories WHERE id = ?', [id]);

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  updatePartialCategory,
  deleteCategory,
};
