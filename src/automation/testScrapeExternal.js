import { scrapeExternalArticle } from './scrapeExternal.js';

(async () => {
  const testUrl = 'https://www.ibm.com/topics/chatbots';
  const content = await scrapeExternalArticle(testUrl);

  console.log('Scraped content preview:\n');
  console.log(content.substring(0, 500), '...');
})();
