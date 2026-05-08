const PostModel = require('../models/postModel');

const getAllPosts = async (req, res) => {
  try {
    const [data] = await PostModel.getAllPosts();
    res.json({
      message: 'GET all posts success',
      total: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await PostModel.getPostById(id);
    if (!rows.length) {
      return res.status(404).json({
        message: 'Post tidak ditemukan',
        data: null,
      });
    }
    res.json({ message: 'GET post success', data: rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const getPostsByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [data] = await PostModel.getPostsByUserId(user_id);
    if (!data.length) {
      return res.status(404).json({
        message: 'Tidak ada post dari user ini',
        data: null,
      });
    }
    res.json({
      message: 'GET posts by user success',
      total: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const searchPosts = async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({
      message: 'Keyword wajib diisi',
      data: null,
    });
  }
  try {
    const [data] = await PostModel.searchPosts(keyword);
    res.json({
      message: `Search "${keyword}" success`,
      total: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const createPost = async (req, res) => {
  const { body } = req;
  if (!body.title || !body.content) {
    return res.status(400).json({
      message: 'Title dan content wajib diisi',
      data: null,
    });
  }
  try {
    // Ambil user_id dari token JWT
    const user_id = req.user.id;
    await PostModel.createPost({ ...body, user_id });
    res.status(201).json({
      message: 'CREATE post success',
      data: { ...body, user_id },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await PostModel.updatePost(body, id);
    res.json({
      message: 'UPDATE post success',
      data: { id, ...body },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await PostModel.deletePost(id);
    res.json({ message: 'DELETE post success', data: null });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

module.exports = { getAllPosts, getPostById, getPostsByUserId, searchPosts, createPost, updatePost, deletePost };
