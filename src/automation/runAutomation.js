import 'dotenv/config';

import fetchArticles from './fetchArticles.js';
import { searchGoogle } from './searchGoogle.js';
import { scrapeExternalArticle } from './scrapeExternal.js';
import { rewriteWithGemini } from './llmRewrite.js';
import { createUpdatedArticle } from './createUpdatedArticle.js';


async function runAutomation() {
  const articles = await fetchArticles();

  const pendingArticles = articles.filter(a => {
  const hasUpdatedVersion = articles.some(
    x =>
      x.parentArticleId &&
      x.parentArticleId.toString() === a._id.toString()
  );

  return !a.isUpdated && !hasUpdatedVersion;
});



  if (pendingArticles.length === 0) {
    console.log('No articles left to update.');
    return;
  }

  console.log(`Found ${pendingArticles.length} articles to update.\n`);

  for (const article of pendingArticles) {
    try {
      console.log(`Processing article: ${article.title}\n`);

      // 1️⃣ Google search
      const competitorLinks = await searchGoogle(article.title);
      console.log('Competitor links:', competitorLinks);

      // 2️⃣ Scrape competitor content
      const competitorContents = [];
      for (const link of competitorLinks) {
        const text = await scrapeExternalArticle(link);
        if (text) competitorContents.push(text);
      }

      if (competitorContents.length === 0) {
        console.log('⚠️ No competitor content available, skipping.\n');
        continue;
      }

      // 3️⃣ Rewrite using Gemini
      const updatedContent = await rewriteWithGemini(
        article.content,
        competitorContents
      );

      if (!updatedContent) {
        console.log('⚠️ LLM failed, skipping.\n');
        continue;
      }

      // 4️⃣ Update article via API
      await createUpdatedArticle(
      article,
      updatedContent,
      competitorLinks
    );

    console.log(`✅ Created updated version for: ${article.title}`);


      
    } catch (error) {
      console.error(`❌ Failed for ${article.title}:`, error.message);
    }
  }

  console.log('🎉 Automation completed for all pending articles.');
}


runAutomation();
