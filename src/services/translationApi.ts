import axios from 'axios';

// Cache para evitar traducir el mismo texto múltiples veces
const translationCache = new Map<string, string>();

/**
 * Translate text from English to Spanish using LibreTranslate
 * @param text - Text to translate
 * @returns Translated text in Spanish
 */
export const translateToSpanish = async (text: string): Promise<string> => {
  // Return empty if no text
  if (!text || text.trim() === '') {
    return '';
  }

  // Check cache first
  if (translationCache.has(text)) {
    return translationCache.get(text)!;
  }

  try {
    // Using LibreTranslate free API
    const response = await axios.post('https://libretranslate.com/translate', {
      q: text,
      source: 'en',
      target: 'es',
      format: 'text'
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000
    });

    const translatedText = response.data.translatedText || text;
    
    // Cache the translation
    translationCache.set(text, translatedText);
    
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    // Return original text if translation fails
    return text;
  }
};

/**
 * Translate multiple texts in batch
 * @param texts - Array of texts to translate
 * @returns Array of translated texts
 */
export const translateBatch = async (texts: string[]): Promise<string[]> => {
  const promises = texts.map(text => translateToSpanish(text));
  return Promise.all(promises);
};

export default {
  translateToSpanish,
  translateBatch
};
