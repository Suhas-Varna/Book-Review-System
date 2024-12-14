import React, { useState } from 'react';
import axios from '../../axiosConfig';

const ReviewForm = ({ bookId, onReviewSubmit }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');  // To handle error message if any

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment) {
      setError('Comment cannot be empty');
      return; // Prevent submission if comment is empty
    }

    const reviewData = {
      bookId,
      rating,
      comment,
    };

    try {
      const response = await axios.post('/reviews/add', reviewData);
      console.log('Review submitted:', response.data);
      setComment(''); // Clear comment after submission
      setRating(1); // Reset rating to default value of 1
      setError(''); // Reset error (if any) after successful submission

      if (onReviewSubmit) onReviewSubmit();  // Callback to refresh the reviews after submission
    } catch (error) {
      console.error('Failed to submit review:', error);
      setError('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="review-form-container">
      <h3>Leave a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="rating">Rating: </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star(s)
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comment">Your Review: </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here"
            required
            rows="4"
          />
        </div>

        {error && <p className="error">{error}</p>}  {/* Display the error message if exists */}

        <button type="submit" className="submit-button">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
