const Book = require('../models/Book');
const { createBookSchema, updateBookSchema } = require('../validators/bookSchemas');

// Create Book
exports.createBook = async (req, res, next) => {
  try {
    const { error } = createBookSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

// Read all Books
exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

// Read single Book
exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

// Update Book
exports.updateBook = async (req, res, next) => {
  try {
    const { error } = updateBookSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

// Delete Book
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
};
