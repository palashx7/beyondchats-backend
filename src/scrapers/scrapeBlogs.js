const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
require('dotenv').config();

const Article = require('../models/Article');

const BASE_URL = 'https://beyondchats.com/blogs/page/';

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

async function getOldestArticleLinks() {
  const articleLinks = [];
  let page = 15;

  while (articleLinks.length < 5 && page > 0) {
    console.log(`Scraping page ${page}...`);

    const { data } = await axios.get(`${BASE_URL}${page}/`);
    const $ = cheerio.load(data);

    const pageLinks = [];

    $('article.entry-card h2.entry-title a').each((_, element) => {
      pageLinks.push($(element).attr('href'));
    });

    pageLinks.reverse();

    for (const link of pageLinks) {
      if (articleLinks.length < 5) {
        articleLinks.push(link);
      }
    }

    page--;
  }

  return articleLinks;
}

async function scrapeArticleDetails(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const title =
    $('h1.entry-title').text().trim() ||
    $('h1').first().text().trim();

  let content = '';
  $('div.e-con-inner p').each((_, p) => {
    content += $(p).text().trim() + '\n\n';
  });

  return {
    title,
    content: content.trim(),
    slug: generateSlug(title)
  };
}

async function scrapeAndSaveOldestArticles() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected for scraping');

  const links = await getOldestArticleLinks();

  for (const link of links) {
    const articleData = await scrapeArticleDetails(link);

    const exists = await Article.findOne({ slug: articleData.slug });
    if (exists) {
      console.log(`Skipped (already exists): ${articleData.title}`);
      continue;
    }

    await Article.create({
      ...articleData,
      isUpdated: false,
      references: []
    });

    console.log(`Saved: ${articleData.title}`);
  }

  await mongoose.disconnect();
  console.log('Scraping completed & DB connection closed');
}

module.exports = { scrapeAndSaveOldestArticles };
