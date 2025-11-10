const express = require('express');
const { protect } = require('../middlewares/auth');
const {authorizeRoles} = require('../middlewares/authorizeRoles'); 
const { createBook,getBooks,getBook,updateBook,deleteBook } = require('../controllers/bookController');

const router = express.Router();

router.use(protect); // All routes below are protected


router.post('/',authorizeRoles('admin'),createBook);
router.get('/',getBooks);
router.get('/:id',getBook);
router.put('/:id',authorizeRoles('admin'),updateBook);
router.post('/:id',authorizeRoles('admin'),deleteBook);

module.exports = router;
