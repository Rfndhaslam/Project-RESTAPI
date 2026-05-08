const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/post/:post_id', commentController.getCommentsByPostId);
router.post('/', verifyToken, commentController.createComment); // ← butuh login
router.put('/:id', verifyToken, commentController.updateComment); // ← butuh login
router.delete('/:id', verifyToken, commentController.deleteComment); // ← butuh login

module.exports = router;
