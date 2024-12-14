const Book = require('../models/Book'); // Ensure this points to your Book model

// Fetch all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error: error.message });
  }
};

// Fetch details of a book by its ID
const getBookDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch book details', error: error.message });
  }
};

const searchBooks = async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === '') {
    return res.status(400).json({ message: 'Search query cannot be empty.' });
  }

  try {
    console.log('Search query received:', query);  // Log the query to check if it arrives correctly

    // Perform the search query using $regex with 'i' for case-insensitive matching
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { authors: { $regex: query, $options: 'i' } },
        { isbn13: { $regex: query, $options: 'i' } },
      ],
    });

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found matching the search query.' });
    }

    console.log('Books found:', books.length);  // Log how many books were found in the DB query
    return res.json(books);
  } catch (error) {
    console.error('SearchBooks Error:', error.message || error);  // More specific logging for errors
    res.status(500).json({ message: 'Failed to search books.', error: error.message });
  }
};


// Fetch recommended books based on a book's category
const getRecommendedBooks = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    // Find books with the same category, excluding the current book
    const recommendedBooks = await Book.find({
      categories: { $in: book.categories },
      _id: { $ne: book._id },
    }).limit(5); // Limit the number of recommendations
    res.json(recommendedBooks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recommended books', error: error.message });
  }
};

module.exports = { getBooks, getBookDetails, searchBooks, getRecommendedBooks };
