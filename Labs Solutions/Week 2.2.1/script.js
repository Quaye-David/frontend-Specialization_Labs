// app.js
import { appState } from './modules/state.js';
import { ThemeManager } from './modules/themeManager.js';
import { FontManager } from './modules/fontManager.js';
import { DictionaryAPI } from './modules/api.js';

class DictionaryApp {
  constructor() {
    this.state = appState;
    this.themeManager = new ThemeManager(this.state);
    this.fontManager = new FontManager(this.state);
    this.setupSearchForm();
    this.setupStateSubscription();
  }

  setupSearchForm() {
    const form = document.querySelector('.search-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleSearch();
    });
  }

  async handleSearch() {
    const input = document.getElementById('search-input');
    const searchTerm = input.value.trim();
    
    if (!searchTerm) return;

    this.state.setState({ loading: true, error: null });
    
    try {
      const data = await DictionaryAPI.searchWord(searchTerm);
      this.state.setState({ 
        wordData: data[0],
        loading: false 
      });
      this.updateUI(data[0]);
    } catch (error) {
      this.state.setState({ 
        error: error.message,
        loading: false 
      });
      this.showError(error.message);
    }
  }

  updateUI(wordData) {
    // Update word title
    document.querySelector('.results__title').textContent = wordData.word;
    
    // Update phonetic
    document.querySelector('.results__phonetic').textContent = 
      wordData.phonetic || wordData.phonetics[0]?.text || '';
    
    // Update audio
    const audioUrl = wordData.phonetics.find(p => p.audio)?.audio;
    if (audioUrl) {
      this.setupAudioButton(audioUrl);
    }

    // Update meanings
    this.updateMeanings(wordData.meanings);
    
    // Update source
    this.updateSource(wordData.sourceUrls);
  }

  setupAudioButton(audioUrl) {
    const audioBtn = document.querySelector('.results__audio-btn');
    const audio = new Audio(audioUrl);
    
    audioBtn.onclick = () => audio.play();
  }

  showError(message) {
    const input = document.getElementById('search-input');
    input.classList.add('search-form__input--error');
    // Add error message display logic
  }

  setupStateSubscription() {
    this.state.subscribe((state) => {
      document.body.setAttribute('data-theme', state.theme);
      document.body.style.setProperty('--font-family', state.font);
    });
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  new DictionaryApp();
});