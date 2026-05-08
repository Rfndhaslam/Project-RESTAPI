const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', postController.getAllPosts);
router.get('/search', postController.searchPosts);
router.get('/user/:user_id', postController.getPostsByUserId);
router.get('/:id', postController.getPostById);
router.post('/', verifyToken, postController.createPost); // ← butuh login
router.put('/:id', verifyToken, postController.updatePost); // ← butuh login
router.delete('/:id', verifyToken, postController.deletePost); // ← butuh login

module.exports = router;
