const BookModel = require('../models/bookModel');

const getAllBooks = async (req, res) => {
  try {
    const [data] = await BookModel.getAllBooks();
    res.json({
      message: 'GET all books success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await BookModel.getBookById(id);
    if (!rows.length) {
      return res.status(404).json({
        message: 'Buku tidak ditemukan',
        data: null,
      });
    }
    res.json({
      message: 'GET book success',
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

// Filter by genre
const getBooksByGenre = async (req, res) => {
  const { genre } = req.params;
  try {
    const [data] = await BookModel.getBooksByGenre(genre);
    if (!data.length) {
      return res.status(404).json({
        message: `Tidak ada buku dengan genre ${genre}`,
        data: null,
      });
    }
    res.json({
      message: `GET books by genre ${genre} success`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

// Search by keyword
const searchBooks = async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({
      message: 'Keyword wajib diisi',
      data: null,
    });
  }
  try {
    const [data] = await BookModel.searchBooks(keyword);
    res.json({
      message: `Search "${keyword}" success`,
      total: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const createBook = async (req, res) => {
  const { body } = req;
  if (!body.title || !body.author) {
    return res.status(400).json({
      message: 'Title dan author wajib diisi',
      data: null,
    });
  }
  try {
    await BookModel.createBook(body);
    res.status(201).json({
      message: 'CREATE book success',
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await BookModel.updateBook(body, id);
    res.json({
      message: 'UPDATE book success',
      data: { id, ...body },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await BookModel.deleteBook(id);
    res.json({
      message: 'DELETE book success',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

module.exports = { getAllBooks, getBookById, getBooksByGenre, searchBooks, createBook, updateBook, deleteBook };
