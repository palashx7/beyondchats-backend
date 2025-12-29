const {
  getOldestArticleLinks,
  scrapeArticleDetails
} = require('./scrapeBlogs');

(async () => {
  const links = await getOldestArticleLinks();

  for (const link of links) {
    const article = await scrapeArticleDetails(link);
    console.log('----------------------------');
    console.log('TITLE:', article.title);
    console.log('CONTENT PREVIEW:', article.content.substring(0, 200), '...');
  }
})();
