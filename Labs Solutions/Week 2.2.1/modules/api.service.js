// api.service.js
const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export async function fetchWord(word) {
    try {
        const response = await fetch(`${API_BASE_URL}/${word}`);
        if (response.status === 404) {
            throw new Error('Word not found in dictionary');
        }
        if (!response.ok) {
            throw new Error('Failed to fetch word definition');
        }
        const data = await response.json();
        return data[0];
    } catch (error) {
        throw {
            message: error.message,
            type: error.message === 'Word not found in dictionary' ? 'NOT_FOUND' : 'API_ERROR'
        };
    }
}