// api.service.js
const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export class APIError extends Error {
    constructor(title, message, resolution, code) {
        super(message);
        this.name = this.constructor.name;
        this.title = title || 'API Error';
        this.message = message || 'An error occurred while processing your request.';
        this.resolution = resolution || 'Please try again later.';
        this.code = code || 'UNKNOWN_ERROR';
        Error.captureStackTrace(this, this.constructor);
    }
}

export async function fetchWord(word) {
    try {
        const response = await fetch(`${API_BASE_URL}/${word}`);
        
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (parseError) {
                errorData = {
                    title: 'API Error',
                    message: 'Failed to parse error response',
                    resolution: 'Please try again later'
                };
            }

            if (response.status === 404) {
                throw new APIError(
                    errorData.title || 'No Definitions Found',
                    errorData.message || 'Sorry pal, we couldn\'t find definitions for the word you were looking for.',
                    errorData.resolution || 'You can try the search again at later time or head to the web instead.',
                    'NOT_FOUND'
                );
            }

            throw new APIError(
                errorData.title || 'API Error',
                errorData.message || 'An error occurred while processing your request.',
                errorData.resolution || 'Please try again later.',
                'API_ERROR'
            );
        }

        const data = await response.json();
        return Array.isArray(data) ? data[0] : data;

    } catch (error) {
        if (error instanceof APIError) {
            throw error;
        }
        if (error instanceof TypeError) {
            throw new APIError(
                'Network Error',
                'Unable to connect to the dictionary service.',
                'Please check your internet connection and try again.',
                'NETWORK_ERROR'
            );
        }
        throw new APIError(
            'Unexpected Error',
            error.message || 'An unexpected error occurred.',
            'Please try again later.',
            'UNKNOWN_ERROR'
        );
    }
}