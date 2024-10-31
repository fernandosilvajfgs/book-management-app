const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OpenAI API key is missing. Please set OPENAI_API_KEY in your environment variables.');
  throw new Error('OpenAI API key is required');
}

function createCoverPrompt(title, author) {
  return `Create an animated and visually appealing book cover illustration for a book titled "${title}" by ${author}. The cover should represent the theme and essence of the book using imagery, colors, and style, but it should not contain any text or letters. Focus on creating an illustration that captures the mood and story of the book without using any written words.`;
}

async function generateCoverImage(title, author) {
  try {
    const prompt = createCoverPrompt(title, author);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
    });

    const imageUrl = response.data[0].url;
    console.log('Generated book cover image URL:', imageUrl);

    return imageUrl;
  } catch (error) {
    if (error.response) {
      console.error('OpenAI API error:', error.response.data);
    } else {
      console.error('Error generating cover image:', error.message);
    }
    throw new Error('Failed to generate cover image.');
  }
}

module.exports = {
  generateCoverImage,
};
