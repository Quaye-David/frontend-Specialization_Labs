// DOMService.js
export class DOMService {
    constructor() {
        this.resultContainer = document.getElementById("result-container");
        this.searchInput = document.getElementById("search-input");
        this.searchBtn = document.getElementById("search-btn");
        this.playButton = document.getElementById("play-audio");
        this.searchError = document.getElementById("search-error");
        this.audio = new Audio();

        if (!this.resultContainer) {
            throw new Error("Result container element not found");
        }

        this.setupAudioButton();
    }

    setupAudioButton() {
        if (this.playButton) {
            this.playButton.addEventListener("click", () => {
                if (this.audio.src) {
                    this.audio.play();
                }
            });
        }
    }

    renderWord(data) {
        if (!data) {
            this.handleError("No data available");
            return;
        }

        try {
            const audioSource = data.phonetics.find(p => p.audio)?.audio || "";
            const meaningsHTML = this.renderMeanings(data.meanings);

            this.resultContainer.innerHTML = `
                <div class="word__header">
                    <div class="word__info">
                        <h2 class="word__title">${data.word}</h2>
                        <div class="word__phonetic">
                            <span class="word__phonetic-text">${data.phonetic || ""}</span>
                        </div>
                    </div>
                    <button class="word__audio-button" id="play-audio">
                        <img class="word__audio-icon" src="./assets/images/icon-play.svg" alt="volume icon" />
                        <img class="word__audio-icon" src="./assets/images/icon-play-hovered.svg" alt="icon-play-hovered" />
                    </button>
                </div>
                <div class="word__meanings">${meaningsHTML}</div>
                <div class="word__source">
                    <span class="word__source-label">Source:</span>
                    <a class="word__source-link" href="${data.sourceUrls[0] || '#'}" target="_blank" rel="noopener noreferrer">
                        ${data.sourceUrls[0] || 'Source Link'}
                    </a>
                </div>
            `;

            if (audioSource) {
                this.audio.src = audioSource;
                this.playButton.style.display = "block";
            } else {
                this.playButton.style.display = "none";
            }

            this.resultContainer.classList.remove("word--hidden");
        } catch (error) {
            console.error("Error rendering word:", error);
            this.handleError("Failed to display word information");
        }
    }

    renderMeanings(meanings) {
        if (!meanings) return '';

        return meanings.map(meaning => `
            <div class="meaning">
                <div class="meaning__part-speech">
                    <h3 class="part-speech-text">${meaning.partOfSpeech}</h3>
                    <hr class="results__divider">
                </div>
                <div class="results__meaning">
                    <h3 class="results__meaning-title">Meaning</h3>
                    <ul class="results__definition-list">
                        ${meaning.definitions.map(def => `
                            <li class="results__definition-list-item">
                                <p>${def.definition}</p>
                                ${def.example ? `<p class="example">"${def.example}"</p>` : ""}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                ${meaning.synonyms && meaning.synonyms.length > 0 ? `
                    <div class="results__synonyms">
                        <span class="results__synonyms-title">Synonyms:</span>
                        <span class="results__synonym-container">${meaning.synonyms.join(", ")}</span>
                    </div>
                ` : ""}
            </div>
        `).join('');
    }

    handleError(message) {
        if (this.searchError) {
            this.searchError.textContent = message;
            this.searchError.classList.add("search__error--visible");
        }
        this.resultContainer.classList.add("word--hidden");
    }

    hideError() {
        if (this.searchError) {
            this.searchError.classList.remove("search__error--visible");
        }
    }
}