const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);
router.get('/search', bookController.searchBooks); // ← search by keyword
router.get('/genre/:genre', bookController.getBooksByGenre); // ← filter by genre
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.patch('/:id', bookController.partialUpdateBook); // ← partial update
router.delete('/:id', bookController.deleteBook);

module.exports = router;
