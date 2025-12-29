import { fetchArticles } from "./fetchArticles.mjs";
import { cleanContent } from "./cleanContent.mjs";

async function run() {
  console.log("🚀 Automation started");

  const articles = await fetchArticles();

  articles.forEach((article, index) => {
    const cleanedContent = cleanContent(article.content);

    console.log(`\n📝 Article ${index + 1}`);
    console.log("Title:", article.title);
    console.log("Original length:", article.content.length);
    console.log("Cleaned length:", cleanedContent.length);
  });
}

run();
