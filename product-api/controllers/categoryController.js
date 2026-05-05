const CategoryModel = require('../models/categoryModel');

const getAllCategories = async (req, res) => {
  try {
    const [data] = await CategoryModel.getAllCategories();
    res.json({
      message: 'GET semua kategori berhasil',
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil kategori', serverMessage: error });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await CategoryModel.getCategoryById(id);
    if (!rows.length) {
      return res.status(404).json({
        message: 'Kategori tidak ditemukan',
        data: null,
      });
    }
    res.json({
      message: 'GET kategori berdasarkan ID berhasil',
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil kategori', serverMessage: error });
  }
};

const createCategory = async (req, res) => {
  const { body } = req;
  if (!body.name) {
    return res.status(400).json({
      message: 'Name dibutuhkan',
      data: null,
    });
  }

  try {
    await CategoryModel.createCategory(body);
    res.status(201).json({
      message: 'Kategori berhasil dibuat',
      data: body,
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat kategori', serverMessage: error });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await CategoryModel.updateCategory(id, body);
    res.json({
      message: 'Kategori berhasil diperbarui',
      data: { id, ...body },
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui kategori', serverMessage: error });
  }
};

const updatePartialCategory = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await CategoryModel.updatePartialCategory(id, body);
    res.json({
      message: 'Kategori berhasil diperbarui secara parsial',
      data: { id, ...body },
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui kategori secara parsial', serverMessage: error });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await CategoryModel.deleteCategory(id);
    res.json({
      message: 'Kategori berhasil dihapus',
      data: null,
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus kategori', serverMessage: error });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  updatePartialCategory,
  deleteCategory,
};
