import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig';  // Ensure axiosInstance is correctly set

const SearchResultsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');  // State for search query
  const [books, setBooks] = useState([]);  // State for search results
  const [error, setError] = useState('');  // State for error messages

  // Handle the search logic
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      setBooks([]);  // Clear previous books on error
      return;
    }

    try {
      // Correct the URL to fetch books from '/books/search'
      const response = await axiosInstance.get('/books/search', {
        params: { query: searchQuery },  // Ensure query is passed as a parameter
      });

      if (response.data && response.data.length > 0) {
        setBooks(response.data);  // Set books only if the response contains data
        setError('');
      } else {
        setBooks([]);
        setError('No books found');  // Message when no books are found
      }
    } catch (err) {
      console.error('Error while fetching books:', err);
      setError('Error while fetching books. Please try again later.');
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch();  // Trigger search when query changes
    }
  }, [searchQuery]);

  return (
    <div>
      {/* Search input and trigger */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}  // Handle input change
        placeholder="Search by title or author"
      />
      {error && <div>{error}</div>} {/* Show error message if any */}

      {/* Display search results */}
      <div>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id}>  
              <h3>{book.title}</h3>
              <p>{book.authors.join(', ')}</p>
            </div>
          ))
        ) : (
          <p>{error || 'No books found'}</p>  
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
