// Update dom.service.js
export class DOMService {
    constructor() {
        this.resultContainer = document.querySelector('.word-details');
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.playButton = document.getElementById('play-audio');
        this.audio = new Audio();
        this.setupAudioButton();
    }

    setupAudioButton() {
        this.playButton.addEventListener('click', () => {
            if (this.audio.src) {
                this.audio.play();
            }
        });
    }

    renderWord(data) {
        if (!data) {
            this.resultContainer.classList.add('hidden');
            return;
        }

        document.getElementById('word').textContent = data.word;
        document.getElementById('phonetic-text').textContent = data.phonetic || '';
        
        // Handle audio
        const audioSource = data.phonetics.find(p => p.audio)?.audio;
        if (audioSource) {
            this.audio.src = audioSource;
            this.playButton.style.display = 'block';
        } else {
            this.playButton.style.display = 'none';
        }

        this.renderMeanings(data.meanings);
        
        // Handle source
        const sourceUrl = data.sourceUrls?.[0];
        if (sourceUrl) {
            const sourceLink = document.getElementById('source-url');
            sourceLink.href = sourceUrl;
            sourceLink.textContent = sourceUrl;
        }

        this.resultContainer.classList.remove('hidden');
    }

    renderMeanings(meanings) {
        const meaningsContainer = document.getElementById('meanings');
        meaningsContainer.innerHTML = meanings.map(meaning => `
            <div class="meaning">
                <h3 class="part-of-speech">${meaning.partOfSpeech}</h3>
                <ul class="definitions-list">
                    ${meaning.definitions.map(def => `
                        <li class="definition">
                            <p>${def.definition}</p>
                            ${def.example ? `<p class="example">"${def.example}"</p>` : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
    }
}