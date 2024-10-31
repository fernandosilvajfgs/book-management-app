const pool = require('../config/db');

const executeQuery = async (query, params) => {
  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error.message);
    throw new Error('Database operation failed'); 
  }
};

const getAllBooks = async () => {
  return await executeQuery('SELECT * FROM books', []);
};

const getBookById = async (id) => {
  const result = await executeQuery('SELECT * FROM books WHERE id = $1', [id]);
  return result[0];
};

const createBook = async (book) => {
  const { isbn, title, author, publication_year, language, summary, cover_image_url } = book;
  const result = await executeQuery(
    `INSERT INTO books (isbn, title, author, publication_year, language, summary, cover_image_url) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [isbn, title, author, publication_year, language, summary, cover_image_url]
  );
  return result[0];
};

const updateBook = async (id, book) => {
  const { isbn, title, author, publication_year, language, summary, cover_image_url } = book;
  const result = await executeQuery(
    `UPDATE books 
     SET isbn = $1, title = $2, author = $3, publication_year = $4, language = $5, summary = $6, cover_image_url = $7 
     WHERE id = $8 RETURNING *`,
    [isbn, title, author, publication_year, language, summary, cover_image_url, id]
  );
  return result[0];
};

const deleteBook = async (id) => {
  const result = await executeQuery('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
  return result[0];
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
