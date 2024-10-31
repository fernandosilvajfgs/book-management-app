const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

//public routes
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

//private routes
router.post('/', authMiddleware, bookController.createBook);
router.put('/:id', authMiddleware, bookController.updateBook);
router.delete('/:id', authMiddleware,  bookController.deleteBook);
router.post('/:id/generate-cover', authMiddleware, bookController.generateBookCover); 

module.exports = router;
