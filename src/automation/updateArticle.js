import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/articles';

export async function updateArticle(id, updatedContent, references) {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, {
      content: updatedContent,
      isUpdated: true,
      references
    });

    return response.data;
  } catch (error) {
    console.error('Failed to update article:', error.message);
    return null;
  }
}
