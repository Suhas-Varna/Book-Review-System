import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams
import axios from 'axios';
import './BookDetailsPage.css';
import ReviewForm from '../../components/ReviewForm/ReviewForm';

const BookDetailsPage = () => {
  const { bookId } = useParams();  // Access bookId from route params
  const [bookDetails, setBookDetails] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/books/${bookId}`);
        setBookDetails(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    const fetchRecommendedBooks = async () => {
      try {
        const response = await axios.get(`/api/books/recommended/${bookId}`);
        setRecommendedBooks(response.data);
      } catch (error) {
        console.error('Error fetching recommended books:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/${bookId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (bookId) {
      fetchBookDetails();
      fetchRecommendedBooks();
      fetchReviews();
    }
  }, [bookId]);

  const handleNewReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]); // Update reviews with new review
  };

  return (
    <div>
      {bookDetails ? (
        <div>
          <h1>{bookDetails.title}</h1>
          <p><strong>Authors:</strong> {bookDetails.authors.join(', ')}</p>
          <p><strong>Categories:</strong> {bookDetails.categories.join(', ')}</p>
          <p><strong>Description:</strong> {bookDetails.description}</p>
          <p><strong>Published Year:</strong> {bookDetails.published_year}</p>
          <p><strong>Number of Pages:</strong> {bookDetails.num_pages}</p>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}

      <h2>Reviews</h2>
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          review && review.comment && (
            <div key={review._id || index} className="review-card"> {/* key should be unique */}
              <p>{review.comment}</p>
              <p>Rating: {review.rating} stars</p>
            </div>
          )
        ))
      ) : (
        <p>No reviews yet for this book. Be the first to review!</p>
      )}

      <ReviewForm bookId={bookId} onReviewSubmit={handleNewReview} />

      <h2>Recommended Books</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {recommendedBooks.length > 0 ? (
          recommendedBooks.map((book) => (
            <div
              key={book._id}  
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '150px',
              }}
            >
              <img
                src={book.thumbnail}
                alt={book.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '5px',
                  marginBottom: '10px',
                }}
              />
              <h3 style={{ fontSize: '1rem', margin: '0 0 5px' }}>{book.title}</h3>
              <p style={{ fontSize: '0.8rem', color: '#777' }}>
                {book.authors.join(', ')}
              </p>
            </div>
          ))
        ) : (
          <p>No recommended books available.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetailsPage;
