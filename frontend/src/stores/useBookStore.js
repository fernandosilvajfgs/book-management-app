import { defineStore } from 'pinia';
import axios from 'axios';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [],
    selectedBook: null,
    showEditModal: false,
    showDetailsModal: false,
    query: '',
    loading: false,
    currentPage: 1,
    pageSize: 4
  }),
  getters: {
    filteredBooks(state) {
      return state.books.filter(
        (book) =>
          book.title.toLowerCase().includes(state.query.toLowerCase()) ||
          book.author.toLowerCase().includes(state.query.toLowerCase()) ||
          book.isbn.toLowerCase().includes(state.query.toLowerCase())
      );
    },
    paginatedBooks(state) {
      const start = (state.currentPage - 1) * state.pageSize;
      return state.filteredBooks.slice(start, start + state.pageSize);
    },
    totalPages(state) {
      return Math.ceil(state.filteredBooks.length / state.pageSize);
    },
  },
  actions: {
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:5000/books');
        this.books = response.data;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    setPageSize(size) {
      this.pageSize = size;
      this.currentPage = 1;
    },
    setCurrentPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    async generateBookCover(bookId) {
      try {
        this.loading = true; 
        const response = await axios.post(`http://localhost:5000/books/${bookId}/generate-cover`);
        const updatedBook = response.data;
        
        const bookIndex = this.books.findIndex((book) => book.id === updatedBook.id);
        if (bookIndex !== -1) {
          this.books[bookIndex] = updatedBook;
        }

        console.log(`Cover generated for book ID: ${bookId}`);
      } catch (error) {
        console.error(`Failed to generate cover for book ID: ${bookId}`, error);
      } finally {
        this.loading = false; 
      }
    },
    async saveBook(bookData) {
      try {
        this.loading = true; 
        await axios.post('http://localhost:5000/books', bookData);
        await this.fetchBooks();
        this.closeEditForm();
      } catch (error) {
        console.error('Error saving book:', error);
      } finally {
        this.loading = false; 
      }
    },
    async updateBook(bookData) {
      try {
        this.loading = true;
        await axios.put(`http://localhost:5000/books/${bookData.id}`, bookData);
        await this.fetchBooks();
        this.closeEditForm();
      } catch (error) {
        console.error('Error updating book:', error);
      } finally {
        this.loading = false; 
      }
    },
    async deleteBook(bookId) {
      try {
        await axios.delete(`http://localhost:5000/books/${bookId}`);
        await this.fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    },
    openAddForm() {
      this.selectedBook = null;
      this.showEditModal = true;
    },
    selectBookForEdit(book) {
      this.selectedBook = book;
      this.showEditModal = true;
    },
    selectBookForDetails(book) {
      this.selectedBook = book;
      this.showDetailsModal = true;
    },
    closeEditForm() {
      this.selectedBook = null;
      this.showEditModal = false;
    },
    closeDetailsModal() {
      this.selectedBook = null;
      this.showDetailsModal = false;
    },
    setQuery(newQuery) {
      this.query = newQuery;
    },
  },
});
