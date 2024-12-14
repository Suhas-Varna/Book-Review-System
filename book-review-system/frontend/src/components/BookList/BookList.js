import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import './BookList.css'; // Import custom CSS for better styling

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch books data from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/books');  // Ensure endpoint is correct
        setBooks(response.data);
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        setError('Error fetching books. Please try again.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="book-list-container">
      <h1>Book List</h1>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Loading Spinner */}
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>ISBN-13</th>
              <th>ISBN-10</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Authors</th>
              <th>Categories</th>
              <th>Thumbnail</th>
              <th>Description</th>
              <th>Published Year</th>
              <th>Average Rating</th>
              <th>Pages</th>
              <th>Ratings Count</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.isbn13} className="book-row">
                <td>{book.isbn13}</td>
                <td>{book.isbn10 || 'N/A'}</td>
                <td>{book.title}</td>
                <td>{book.subtitle || 'N/A'}</td>
                <td>{book.authors.join(', ')}</td>
                <td>{book.categories.join(', ')}</td>
                <td>
                  {book.thumbnail ? (
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="thumbnail"
                    />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>{book.description || 'N/A'}</td>
                <td>{book.published_year}</td>
                <td>{book.average_rating}</td>
                <td>{book.num_pages}</td>
                <td>{book.ratings_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookList;
