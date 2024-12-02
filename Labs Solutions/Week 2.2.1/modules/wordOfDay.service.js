// wordOfDay.service.js
import { fetchWord } from './api.service.js';

export class WordOfDayService {
    constructor() {
        this.storageKey = 'wordOfDay';
        this.timeKey = 'wordOfDayTimestamp';
    }

    async getWordOfDay() {
        const stored = this.getStoredWord();
        if (stored && !this.isExpired()) {
            return stored;
        }

        const newWord = await this.fetchRandomWord();
        this.saveWordOfDay(newWord);
        return newWord;
    }

    getStoredWord() {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }

    saveWordOfDay(wordData) {
        localStorage.setItem(this.storageKey, JSON.stringify(wordData));
        localStorage.setItem(this.timeKey, Date.now().toString());
    }

    isExpired() {
        const timestamp = parseInt(localStorage.getItem(this.timeKey));
        if (!timestamp) return true;

        const now = Date.now();
        const hoursPassed = (now - timestamp) / (1000 * 60 * 60);
        return hoursPassed >= 24;
    }

    async fetchRandomWord() {
        // List of common English words
        const commonWords = [
            'hello', 'world', 'computer', 'programming', 
            'knowledge', 'learning', 'dictionary', 'language',
            'science', 'technology', 'innovation', 'creativity'
        ];
        const randomWord = commonWords[Math.floor(Math.random() * commonWords.length)];
        return await fetchWord(randomWord);
    }
}