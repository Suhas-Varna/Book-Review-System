const express = require('express');
const router = express.Router();
const { getBooks, searchBooks, getBookDetails, getRecommendedBooks } = require('../controllers/bookController');

// Fetch all books
router.get('/', getBooks);

// Fetch book details by ID
router.get('/:id', getBookDetails);  // Handles specific book details

// Search for books based on query parameter (title, author, ISBN)
router.get('/search', searchBooks);

// Fetch recommended books based on a book's category
router.get('/recommended/:id', getRecommendedBooks);

module.exports = router;
