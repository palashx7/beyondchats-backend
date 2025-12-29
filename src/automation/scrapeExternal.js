import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeExternalArticle(url) {
  try {
    const { data } = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; BeyondChatsBot/1.0; +https://beyondchats.com)'
      }
    });

    const $ = cheerio.load(data);

    let text = '';

    // Prefer <article> tag if present
    if ($('article').length) {
      $('article p').each((_, el) => {
        text += $(el).text().trim() + '\n\n';
      });
    } else {
      // Fallback: all paragraph tags
      $('p').each((_, el) => {
        text += $(el).text().trim() + '\n\n';
      });
    }

    // Clean & limit text
    const cleanedText = text
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 4000); // limit for LLM

    return cleanedText;
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error.message);
    return '';
  }
}
