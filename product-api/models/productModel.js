const db = require('../config/databases');

const getAllProducts = () => db.query('SELECT p.*, c.name AS category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id');

const getProductById = (id) => db.query('SELECT p.*, c.name AS category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?', [id]);

const getProductsByCategoryId = (category_id) => db.query('SELECT p.*, c.name AS category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.category_id = ?', [category_id]);

const createProduct = (body) => db.query('INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)', [body.name, body.description, body.price, body.category_id]);

const updateProduct = (id, body) => db.query('UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?', [body.name, body.description, body.price, body.category_id, id]);

const updatePartialProduct = (id, body) => {
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
  if (body.price !== undefined) {
    fields.push('price = ?');
    values.push(body.price);
  }
  if (body.category_id !== undefined) {
    fields.push('category_id = ?');
    values.push(body.category_id);
  }
  if (fields.length === 0) {
    throw new Error('No valid fields to update');
  }
  values.push(id);
  return db.query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, values);
};

const deleteProduct = (id) => db.query('DELETE FROM products WHERE id = ?', [id]);

const searchProducts = (query) => db.query('SELECT p.*, c.name AS category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.name LIKE ? OR p.description LIKE ?', [`%${query}%`, `%${query}%`]);

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategoryId,
  createProduct,
  updateProduct,
  updatePartialProduct,
  deleteProduct,
  searchProducts,
};
