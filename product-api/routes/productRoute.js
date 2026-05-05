const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/category/:category_id', productController.getProductsByCategoryId);
router.get('/search', productController.searchProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.patch('/:id', productController.updatePartialProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
