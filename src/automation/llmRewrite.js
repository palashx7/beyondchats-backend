import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function rewriteWithGemini(
  originalContent,
  competitorContents
) {
  try {
    const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash'
});


    const prompt = `
You are a technical content writer.

Task:
Improve the ORIGINAL article using insights from COMPETITOR articles.
- Do NOT copy sentences.
- Improve clarity, structure, and flow.
- Keep the topic and intent the same.
- Write in a professional, easy-to-read tone.

ORIGINAL ARTICLE:
${originalContent}

COMPETITOR ARTICLES:
${competitorContents.join('\n\n---\n\n')}

Return only the improved article content.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text().trim();
  } catch (error) {
    console.error('Gemini rewrite error:', error.message);
    return '';
  }
}
