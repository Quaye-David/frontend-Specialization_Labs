// events.service.js
import { fetchWord } from './api.service.js';
import { state } from './state.js';
export class EventsService {
    constructor(domService) {
       this.domService = domService;
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.isLoading = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        // Add input validation
        this.searchInput.addEventListener('input', () => {
            const value = this.searchInput.value.trim();
            if (value.length > 0) {
                this.searchInput.classList.remove('search__input--error');
                this.domService.hideError();
            }
        });
    }

    validateInput(word) {
        if (!word) {
            throw new Error('Whoops, can\'t be empty...');
        }
        if (!/^[a-zA-Z\s-]+$/.test(word)) {
            throw new Error('Please enter valid characters (a-z, A-Z, spaces, hyphens)');
        }
        if (word.length > 50) {
            throw new Error('Word is too long (max 50 characters)');
        }
    }

    async handleSearch() {
        try {
            const word = this.searchInput.value.trim();
            this.validateInput(word);
    
            if (this.isLoading) return;
            this.isLoading = true;
            this.setLoadingState(true);
    
            const definition = await fetchWord(word);
            if (definition) {
                // Hide not found container first
                this.domService.notFoundContainer.classList.add('not-found--hidden');
                // Update state and show results
                state.setState(definition);
                this.domService.showResults();
            }
        } catch (error) {
            // Always hide results first
            this.domService.resultContainer.classList.add('word--hidden');
            
            if (error.type === 'NOT_FOUND') {
                this.domService.showNotFound();
            } else {
                this.searchInput.classList.add('search__input--error');
                this.domService.handleError(error.message, error);
            }
        } finally {
            this.isLoading = false;
            this.setLoadingState(false);
        }
    }


    setLoadingState(isLoading) {
        this.searchBtn.disabled = isLoading;
        this.searchInput.disabled = isLoading;
        this.searchBtn.classList.toggle('search__button--loading', isLoading);
    }
}