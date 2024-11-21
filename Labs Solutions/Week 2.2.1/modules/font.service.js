// modules/font.service.js
import { state } from './state.js';

export class FontService {
    constructor() {
        this.fontSelector = document.getElementById('font-selector');
        this.fonts = ['Inter', 'Lora', 'Inconsolata'];
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
        this.fontSelector.innerHTML = this.fonts
            .map(font => `<option value="${font}" ${font === state.currentFont ? 'selected' : ''}>${font}</option>`)
            .join('');

        this.fontSelector.addEventListener('change', (e) => {
            state.setFont(e.target.value);
        });
    }

    applyFont(font) {
        document.body.style.fontFamily = font;
        this.fontSelector.value = font;
    }
}