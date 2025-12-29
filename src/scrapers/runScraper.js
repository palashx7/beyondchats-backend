const { scrapeAndSaveOldestArticles } = require('./scrapeBlogs');

scrapeAndSaveOldestArticles()
  .then(() => {
    console.log('Done');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
