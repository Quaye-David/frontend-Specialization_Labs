// modules/font.service.js
import { state } from './state.js';

export class FontService {
    constructor() {
        this.fontSelector = document.getElementById('font-selector');
        this.fonts = {
            'Inter': 'var(--font-inter)',
            'Lora': 'var(--font-lora)',
            'Inconsolata': 'var(--font-inconsolata)'
        };
        this.initialize();
    }

    initialize() {
        this.setupFontSelector();
        this.applyFont(state.currentFont);
        
        state.subscribeFontChange((font) => {
            this.applyFont(font);
        });
    }

    setupFontSelector() {
        this.fontSelector.innerHTML = Object.keys(this.fonts)
            .map(font => `<option value="${font}" ${font === state.currentFont ? 'selected' : ''}>${font}</option>`)
            .join('');

        this.fontSelector.addEventListener('change', (e) => {
            state.setFont(e.target.value);
        });
    }

    applyFont(font) {
        document.documentElement.style.setProperty('--font-family', this.fonts[font]);
        this.fontSelector.value = font;
    }
}