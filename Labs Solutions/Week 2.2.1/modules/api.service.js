const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export async function fetchWord(word) {
    try {
        const response = await fetch(`${API_BASE_URL}/${word}`);
        if (!response.ok) throw new Error('Word not found');
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('Error fetching word:', error);
        return null;
    }
}