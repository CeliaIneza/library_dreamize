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
exports.getBooks = async (req, res) => {
try {
const { page = 1, limit = 5, search = '' } = req.query;


// Search condition
const query = {
$or: [
{ title: { $regex: search, $options: 'i' } },
{ author: { $regex: search, $options: 'i' } },
{ isbn: { $regex: search, $options: 'i' } }
]
};


const books = await Book.find(query)
.limit(limit * 1)
.skip((page - 1) * limit);


const total = await Book.countDocuments(query);


res.json({
total,
page: Number(page),
totalPages: Math.ceil(total / limit),
books
});
} catch (error) {
res.status(500).json({ message: error.message });
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
