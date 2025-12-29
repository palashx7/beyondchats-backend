const fetchArticles = require('./fetchArticles');

(async () => {
  const articles = await fetchArticles();

  console.log(`Fetched ${articles.length} articles\n`);

  articles.forEach((article, index) => {
    console.log(`${index + 1}. ${article.title}`);
    console.log(`   isUpdated: ${article.isUpdated}`);
  });
})();
