const Book = require('../models/bookModel');
const { generateSummary } = require('../utils/summaryGenerator');
const { generateCoverImage } = require('../utils/coverGenerator');
const validateBookData = require('../utils/bookValidator'); 

const handleError = (res, error, message = 'An error occurred') => {
  console.error(message, error.message);
  res.status(500).json({ error: message });
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    handleError(res, error, 'Error fetching all books');
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.getBookById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    handleError(res, error, `Error fetching book with ID ${req.params.id}`);
  }
};

const createBook = async (req, res) => {
  const { isbn, title, author, publication_year, language, generateCover } = req.body;

  // Validate input data
  const validationErrors = validateBookData(req.body);
  if (validationErrors) {
    return res.status(400).json({ error: validationErrors });
  }

  try {
    const summary = await generateSummary(title, author);

    let cover_image_url = null;
    if (generateCover) {
      try {
        cover_image_url = await generateCoverImage(title, author);
        console.log('Generated cover image URL:', cover_image_url);
      } catch (error) {
        console.error('Cover image generation failed:', error.message);
        cover_image_url = 'https://via.placeholder.com/1024x1024.png?text=No+Cover+Available';
      }
    }

    const newBook = await Book.createBook({
      isbn,
      title,
      author,
      publication_year,
      language,
      summary,
      cover_image_url,
    });

    res.status(201).json(newBook);
  } catch (error) {
    handleError(res, error, 'Error creating book');
  }
};

const updateBook = async (req, res) => {
  const existingBook = await Book.getBookById(req.params.id);
  if (!existingBook) return res.status(404).json({ error: 'Book not found' });

  // Validate input data
  const validationErrors = validateBookData({ ...existingBook, ...req.body });
  if (validationErrors) {
    return res.status(400).json({ error: validationErrors });
  }

  try {
    const updatedData = { ...existingBook, ...req.body };
    const updatedBook = await Book.updateBook(req.params.id, updatedData);
    res.status(200).json(updatedBook);
  } catch (error) {
    handleError(res, error, `Error updating book with ID ${req.params.id}`);
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.deleteBook(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    handleError(res, error, `Error deleting book with ID ${req.params.id}`);
  }
};

const generateBookCover = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.getBookById(id);

    if (!book) return res.status(404).json({ error: 'Book not found' });

    try {
      const cover_image_url = await generateCoverImage(book.title, book.author);
      console.log('Generated cover image URL:', cover_image_url);

      const updatedBook = await Book.updateBook(id, { ...book, cover_image_url });
      res.status(200).json(updatedBook);
    } catch (error) {
      console.error('Cover image generation failed:', error.message);
      res.status(500).json({ error: 'Failed to generate cover image.' });
    }
  } catch (error) {
    handleError(res, error, `Error generating cover image for book ID ${req.params.id}`);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  generateBookCover,
};
