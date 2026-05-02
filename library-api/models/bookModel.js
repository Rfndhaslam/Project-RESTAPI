const db = require('../config/database');

const getAllBooks = () => db.query('SELECT * FROM books');

const getBookById = (id) => db.query('SELECT * FROM books WHERE id = ?', [id]);

// Filter berdasarkan genre
const getBooksByGenre = (genre) => db.query('SELECT * FROM books WHERE genre = ?', [genre]);

// Cari buku berdasarkan judul/author
const searchBooks = (keyword) => db.query('SELECT * FROM books WHERE title LIKE ? OR author LIKE ?', [`%${keyword}%`, `%${keyword}%`]);

const createBook = (body) => db.query('INSERT INTO books (title, author, genre, year, stock) VALUES (?, ?, ?, ?, ?)', [body.title, body.author, body.genre, body.year, body.stock]);

const updateBook = (body, id) => db.query('UPDATE books SET title = ?, author = ?, genre = ?, year = ?, stock = ? WHERE id = ?', [body.title, body.author, body.genre, body.year, body.stock, id]);

const deleteBook = (id) => db.query('DELETE FROM books WHERE id = ?', [id]);

module.exports = { getAllBooks, getBookById, getBooksByGenre, searchBooks, createBook, updateBook, deleteBook };
