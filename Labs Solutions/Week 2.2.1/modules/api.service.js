// api.service.js
const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export class APIError extends Error {
    constructor(message, type) {
        super(message);
        this.type = type;
    }
}

export async function fetchWord(word) {
    try {
        const response = await fetch(`${API_BASE_URL}/${word}`);
        
        if (response.status === 404) {
            throw new APIError('Word not found in dictionary', 'NOT_FOUND');
        }
        
        if (!response.ok) {
            throw new APIError('Failed to fetch word definition', 'API_ERROR');
        }

        const [data] = await response.json();
        return data;
    } catch (error) {
        if (error instanceof APIError) {
            throw error;
        }
        throw new APIError(error.message, 'API_ERROR');
    }
}