const Review = require('../models/reviewModel');

// POST: Add a review for a specific book
const addReview = async (req, res) => {
  const { bookId, rating, comment } = req.body;

  try {
    const newReview = new Review({
      bookId,  // Using the book's ISBN as the bookId
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add review', error: error.message });
  }
};

// GET: Get reviews for a specific book
const getReviews = async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await Review.find({ bookId });
    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this book' });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
};

module.exports = { addReview, getReviews };
