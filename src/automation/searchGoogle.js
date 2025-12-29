import axios from 'axios';

const SERPER_API_KEY = process.env.SERPER_API_KEY;
const SERPER_URL = 'https://google.serper.dev/search';

export async function searchGoogle(query) {
  try {
    const response = await axios.post(
      SERPER_URL,
      { q: query },
      {
        headers: {
          'X-API-KEY': SERPER_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    const results = response.data.organic || [];

    const links = results
      .filter(item => item.link && !item.link.includes('beyondchats.com'))
      .slice(0, 2)
      .map(item => item.link);

    return links;
  } catch (error) {
    console.error('Google search error:', error.message);
    return [];
  }
}
