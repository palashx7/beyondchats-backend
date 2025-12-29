import 'dotenv/config';

import fetchArticles from './fetchArticles.js';
import { searchGoogle } from './searchGoogle.js';
import { scrapeExternalArticle } from './scrapeExternal.js';
import { rewriteWithGemini } from './llmRewrite.js';
import { updateArticle } from './updateArticle.js';

async function runAutomation() {
  const articles = await fetchArticles();

  // 🔒 SAFETY: only process first non-updated article
  const article = articles.find(a => !a.isUpdated);

  if (!article) {
    console.log('No articles left to update.');
    return;
  }

  console.log(`\nProcessing article: ${article.title}\n`);

  // 1️⃣ Google search
  const competitorLinks = await searchGoogle(article.title);
  console.log('Competitor links:', competitorLinks);

  // 2️⃣ Scrape competitor content
  const competitorContents = [];
  for (const link of competitorLinks) {
    const text = await scrapeExternalArticle(link);
    if (text) competitorContents.push(text);
  }

  // 3️⃣ Rewrite using Gemini
  const updatedContent = await rewriteWithGemini(
    article.content,
    competitorContents
  );

  if (!updatedContent) {
    console.log('LLM failed to generate content.');
    return;
  }

  // 4️⃣ Update article via API
  const updatedArticle = await updateArticle(
    article._id,
    updatedContent,
    competitorLinks
  );

  if (updatedArticle) {
    console.log('✅ Article updated successfully:', updatedArticle.title);
  }
}

runAutomation();
