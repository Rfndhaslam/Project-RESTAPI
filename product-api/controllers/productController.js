const productModel = require('../models/productModel');

const getAllProducts = async (req, res) => {
  try {
    const [data] = await productModel.getAllProducts();
    res.json({
      message: 'GET semua produk berhasil',
      total: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil semua produk', serverMessage: error });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await productModel.getProductById(id);
    if (!rows.length) {
      return res.status(404).json({
        message: 'Produk tidak ditemukan',
        data: null,
      });
    }
    res.json({
      message: 'GET produk berdasarkan ID berhasil',
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil produk', serverMessage: error });
  }
};

const getProductsByCategoryId = async (req, res) => {
  const { category_id } = req.params;
  try {
    const [data] = await productModel.getProductsByCategoryId(category_id);
    if (!data.length) {
      return res.status(404).json({
        message: 'Tidak ada produk ditemukan untuk kategori ini',
        data: null,
      });
    }
    res.json({
      message: 'GET produk berdasarkan ID kategori berhasil',
      total: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil produk berdasarkan kategori', serverMessage: error });
  }
};

const searchProducts = async (req, res) => {
  const { query } = req.query;
  try {
    const [data] = await productModel.searchProducts(query);
    res.json({
      message: 'Pencarian produk berhasil',
      total: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mencari produk', serverMessage: error });
  }
};

const createProduct = async (req, res) => {
  const { body } = req;
  if (!body.name || !body.price || !body.category_id) {
    return res.status(400).json({
      message: 'name, price, dan category_id adalah field yang wajib diisi',
      data: null,
    });
  }
  try {
    await productModel.createProduct(body);
    res.status(201).json({
      message: 'Produk berhasil dibuat',
      data: body,
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat produk', serverMessage: error });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await productModel.updateProduct(id, body);
    res.json({
      message: 'Produk berhasil diperbarui',
      data: { id, ...body },
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui produk', serverMessage: error });
  }
};

const updatePartialProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await productModel.updatePartialProduct(id, body);
    res.json({
      message: 'Produk berhasil diperbarui secara parsial',
      data: { id, ...body },
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui produk secara parsial', serverMessage: error });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productModel.deleteProduct(id);
    res.json({
      message: 'Produk berhasil dihapus',
      data: null,
    });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus produk', serverMessage: error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategoryId,
  searchProducts,
  createProduct,
  updateProduct,
  updatePartialProduct,
  deleteProduct,
};
