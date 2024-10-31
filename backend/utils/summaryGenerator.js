const OpenAI = require('openai');
require('dotenv').config(); 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OpenAI API key is missing. Please set OPENAI_API_KEY in your environment variables.');
  throw new Error('OpenAI API key is required');
}

function ensureCompleteSentences(text, desiredSentenceCount) {
  const sentences = text.match(/[^.!?]*[.!?]/g);
  if (sentences && sentences.length >= desiredSentenceCount) {
    return sentences.slice(0, desiredSentenceCount).join(' ').trim();
  } else if (sentences) {
    return sentences.join(' ').trim();
  } else {
    return text.trim();
  }
}

async function generateSummary(title, author, desiredSentenceCount = 2) {
  try {
    const messages = [
      {
        role: 'system',
        content: `You are a helpful assistant that provides concise summaries of books.`,
      },
      {
        role: 'user',
        content: `Summarize the book titled "${title}" by ${author} in approximately ${desiredSentenceCount} sentences. Each sentence should be complete.`,
      },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 400,
      temperature: 0.5,
    });

    let summary = completion.choices?.[0]?.message?.content?.trim() || 'Summary not available.';
    summary = ensureCompleteSentences(summary, desiredSentenceCount);

    return summary;
  } catch (error) {
    if (error.response) {
      console.error('OpenAI API error:', error.response.data);
    } else {
      console.error('Error generating summary:', error.message);
    }
    throw new Error('Failed to generate summary.');
  }
}

module.exports = {
  generateSummary,
};
