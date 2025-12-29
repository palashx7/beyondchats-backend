const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api/articles';

async function fetchArticles() {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error.message);
    return [];
  }
}

module.exports = fetchArticles;
