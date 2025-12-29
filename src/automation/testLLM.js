import 'dotenv/config';
import { rewriteWithGemini } from './llmRewrite.js';

(async () => {
  const original = `
Chatbots are software applications designed to simulate human conversation.
They are widely used in customer support and automation.
`;

  const competitors = [
    'Chatbots help businesses automate conversations and improve customer experience.',
    'Modern chatbots use AI to understand user intent and provide instant responses.'
  ];

  const updated = await rewriteWithGemini(original, competitors);

  console.log('UPDATED CONTENT:\n');
  console.log(updated);
})();
