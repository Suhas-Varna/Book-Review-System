import axios from 'axios';

// Use environment variables for flexibility
const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api/';

const axiosInstance = axios.create({
  baseURL, // Dynamically set the base URL
  headers: {
    'Content-Type': 'application/json', // Ensure proper headers for JSON requests
  },
});

export default axiosInstance;
