const express = require('express');
const { addReview, getReviews } = require('../controllers/reviewController');
const router = express.Router();

// Route to add a new review
router.post('/add', addReview);

// Route to get all reviews for a book
router.get('/:bookId', getReviews);

module.exports = router;
