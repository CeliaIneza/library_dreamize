const express = require('express');
const { protect } = require('../middlewares/auth');
const { createBook,getBooks,getBook,updateBook,deleteBook } = require('../controllers/bookController');

const router = express.Router();

router.use(protect); // All routes below are protected

router.route('/')
  .post(createBook)
  .get(getBooks);

router.route('/:id')
  .get(getBook)
  .put(updateBook)
  .delete(deleteBook);

module.exports = router;
