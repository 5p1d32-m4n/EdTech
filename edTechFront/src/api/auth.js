import axios from "axios";

// Get API base URL from environment variables
const API_BASE_URL = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`;

// Auth service object
const authService = {
  /**
   * Login user
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<string>} JWT token
   */
  async login(email, password) {
    console.log(`Full request url: ${API_BASE_URL}`);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`, 
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.data?.token) {
        throw new Error('No token received');
      }
      
      return response.data.token;
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw for error handling in components
    }
  },

  /**
   * Register new user
   * @param {object} userData 
   * @returns {Promise<string>} JWT token
   */
  async signup(userData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/signup`, 
        userData
      );
      
      if (!response.data?.token) {
        throw new Error('No token received');
      }
      
      return response.data.token;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  }
};

export default authService;