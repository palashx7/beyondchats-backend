import 'dotenv/config';
import { searchGoogle } from './searchGoogle.js';

(async () => {
  const title = 'Introduction to Chatbots';
  const links = await searchGoogle(title);

  console.log('Search results:');
  console.log(links);
})();
