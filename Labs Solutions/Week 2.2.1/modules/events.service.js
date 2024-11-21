// events.service.js
import { state } from './state.js';
import { fetchWord } from './api.service.js';

export class EventsService {
    constructor(domService) {
        this.domService = domService;
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
    }

    async handleSearch() {
        const word = this.searchInput.value.trim();
        if (!word) return;

        const definition = await fetchWord(word);
        state.setState(definition);
    }
}