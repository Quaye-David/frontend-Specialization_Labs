// api.js
export class DictionaryAPI {
  static async searchWord(word) {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Word "${word}" not found in dictionary`);
        }
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      // Log error for debugging/monitoring
      console.error(`Dictionary API error for word "${word}":`, error);
      
      // Transform into a user-friendly error
      if (error.name === 'TypeError') {
        throw new Error('Network error: Please check your internet connection');
      }
      throw error;
    }
  }
}