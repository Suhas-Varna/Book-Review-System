import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig'; // Use the axios instance
import './HomePage.css';

const generateStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="stars">
      {'★'.repeat(fullStars)}
      {halfStars === 1 && '☆'}
      {'☆'.repeat(emptyStars)}
    </div>
  );
};

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/books');  // Backend should send the data with this route
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${query}`);  // Redirects to SearchResultsPage
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to BookHub</h1>
        <p>Your next great read is just a click away!</p>
        
        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
        
        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books by title, author, or category"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <img
              src={book.thumbnail}
              alt={book.title}
              className="book-thumbnail"
              onClick={() => navigate(`/book/${book._id}`)}  // Navigates to BookDetailsPage
            />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-authors">{book.authors.join(', ')}</p>
            <div className="book-rating">{generateStars(book.average_rating)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
