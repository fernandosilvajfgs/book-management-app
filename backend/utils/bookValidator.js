const validateBookData = (data) => {
    const { isbn, title, author, publication_year, language } = data;
    const errors = {};
  
    if (!isbn || typeof isbn !== 'string' || isbn.length !== 13) {
      errors.isbn = 'ISBN must be a 13-character string.';
    }
    if (!title || title == "" || typeof title !== 'string') {
      errors.title = 'Title is required and must be a string.';
    }
    if (!author || author == "" || typeof author !== 'string') {
      errors.author = 'Author is required and must be a string.';
    }
    if (!publication_year || publication_year == "" || typeof publication_year !== 'number' || !Number.isInteger(publication_year)) {
      errors.publication_year = 'Publication year is required and must be an integer.';
    }
    if (!language || language == "" || typeof language !== 'string') {
      errors.language = 'Language is required and must be a string.';
    }
  
    return Object.keys(errors).length ? errors : null;
  };
  
  module.exports = validateBookData;
  