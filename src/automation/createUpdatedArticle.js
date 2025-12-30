import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/articles';

export async function createUpdatedArticle(originalArticle, updatedContent, references) {
  try {
    const response = await axios.post(API_BASE_URL, {
      title: originalArticle.title,
      slug: `${originalArticle.slug}-updated`,
      content: updatedContent,
      isUpdated: true,
      parentArticleId: originalArticle._id,
      references
    });

    return response.data;
  } catch (error) {
    console.error('Failed to create updated article:', error.message);
    return null;
  }
}
