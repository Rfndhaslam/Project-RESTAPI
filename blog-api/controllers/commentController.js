const CommentModel = require('../models/commentModel');

const getCommentsByPostId = async (req, res) => {
  const { post_id } = req.params;
  try {
    const [data] = await CommentModel.getCommentsByPostId(post_id);
    res.json({
      message: 'GET comments success',
      total: data.length,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const createComment = async (req, res) => {
  const { body } = req;
  if (!body.post_id || !body.comment) {
    return res.status(400).json({
      message: 'post_id dan comment wajib diisi',
      data: null,
    });
  }
  try {
    // Ambil user_id dari token JWT
    const user_id = req.user.id;
    await CommentModel.createComment({ ...body, user_id });
    res.status(201).json({
      message: 'CREATE comment success',
      data: { ...body, user_id },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await CommentModel.updateComment(body, id);
    res.json({
      message: 'UPDATE comment success',
      data: { id, ...body },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await CommentModel.deleteComment(id);
    res.json({ message: 'DELETE comment success', data: null });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', serverMessage: error });
  }
};

module.exports = { getCommentsByPostId, createComment, updateComment, deleteComment };
