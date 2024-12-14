const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  isbn13: { type: String, unique: true, required: true }, // Primary key
  isbn10: { type: String }, // Optional identifier
  title: { type: String, required: true }, // Book title
  subtitle: { type: String }, // Optional subtitle
  authors: { type: [String], required: true }, // Array of authors
  categories: { type: [String] }, // Genres or categories
  thumbnail: { type: String }, // URL to the thumbnail image
  description: { type: String }, // Description or synopsis
  published_year: { type: Number }, // Year of publication
  average_rating: { type: Number }, // Average user rating
  num_pages: { type: Number }, // Total number of pages
  ratings_count: { type: Number }, // Total number of ratings
});

module.exports = mongoose.model('Book', bookSchema);
