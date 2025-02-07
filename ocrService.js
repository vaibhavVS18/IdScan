const axios = require('axios');
const FormData = require('form-data');

// Load environment variables
require('dotenv').config();

const apiKey = process.env.OCR_API_KEY;
const apiUrl = process.env.OCR_API_URL;

const processImage = async (imageBuffer, fileExtension) => {
  try {
    // Create form data for the OCR API
    const formData = new FormData();
    formData.append('apikey', apiKey);
    formData.append('file', imageBuffer, `image${fileExtension}`);

    // Send image to OCR API
    const response = await axios.post(apiUrl, formData, {
      headers: formData.getHeaders(),
    });

    const result = response.data;

    // Handle OCR API response
    if (result.IsErroredOnProcessing) {
      throw new Error(result.ErrorMessage.join(' '));
    }

    return result.ParsedResults[0].ParsedText;
  } 
  catch (error) {
    console.error('OCR Error:', error.message);
    throw error;
  }
}

module.exports = {processImage};