import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList/BookList';
import ReviewForm from './components/ReviewForm/ReviewForm';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import BookDetailsPage from './pages/BookDetailsPage/BookDetailsPage';
import ProtectedRoute from './components/ProtectedRoute';
import SignupPage from './pages/SignupPage/SignupPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/book/:bookId" element={<BookDetailsPage />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Main protected route for the homepage */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
