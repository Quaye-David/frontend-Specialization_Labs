export class DOMService {
  constructor() {
    this.resultContainer = document.getElementById("result-container");
    this.searchInput = document.getElementById("search-input");
    this.searchBtn = document.getElementById("search-btn");
    this.playButton = document.getElementById("play-audio");
    this.searchError = document.getElementById("search-error");
    this.notFoundContainer = document.getElementById("not-found-container");
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
    if (!data || !this.resultContainer) {
      this.handleError("No data available");
      return;
    }

    try {
      const wordElement = document.getElementById("word");
      const phoneticElement = document.getElementById("phonetic-text");
      const sourceLink = document.getElementById("source-url");

      if (wordElement) wordElement.textContent = data.word;
      if (phoneticElement) phoneticElement.textContent = data.phonetic || "";

      // Handle audio
      const audioSource = data.phonetics.find((p) => p.audio)?.audio;
      if (audioSource && this.playButton) {
        this.audio.src = audioSource;
        this.playButton.style.display = "block";
      } else if (this.playButton) {
        this.playButton.style.display = "none";
      }

      this.renderMeanings(data.meanings);

      // Handle source
      if (sourceLink && data.sourceUrls?.[0]) {
        sourceLink.href = data.sourceUrls[0];
        sourceLink.textContent = data.sourceUrls[0];
      }

      this.resultContainer.classList.remove("word--hidden");
    } catch (error) {
      console.error("Error rendering word:", error);
      this.handleError("Failed to display word information");
    }
  }

  renderMeanings(meanings) {
    const meaningsContainer = document.getElementById("meanings");
    if (!meaningsContainer || !meanings) return;

    meaningsContainer.innerHTML = meanings
      .map(
        (meaning) => `
                <div class="meaning">
                    <div class="meaning__part-speech">
                        <h3 class="meaning__part-speech-text">${
                          meaning.partOfSpeech
                        }</h3>
                            <hr class="meaning__divider">
                    </div>
                    <div class="results__meaning">
                        <h3 class="results__meaning-title">Meaning</h3>
                        <ul class="results__definition-list">
                        ${meaning.definitions
                          .map(
                            (def) => `
                        <li class="results__definition-list-item">
                            <p class="results__definition">${def.definition}</p>
                            ${
                              def.example
                                ? `<p class="definition__example">"${def.example}"</p>`
                                : ""
                            }
                        </li>
                    `
                          )
                          .join("")}
                </ul>
                </div>
                ${
                  meaning.synonyms && meaning.synonyms.length > 0
                    ? `
                   <div class="results__synonyms">
                        <span class="results__synonyms-title">Synonyms:</span>
                        <span class="results__synonym-container">${meaning.synonyms.join(
                          ", "
                        )}</span>
                    </div>
                `
                    : ""
                }
            </div>
        `
      )
      .join("");
  }

  showNotFound(message) {
    // Ensure results are hidden first
    this.resultContainer.classList.add('word--hidden');
    
    // Show not found container
    this.notFoundContainer.classList.remove('not-found--hidden');
    
    // Update message
    const messageElement = document.getElementById('not-found-message');
    if (messageElement && message) {
        messageElement.textContent = message;
    }
}

  showResults() {
    // Show results container
    this.resultContainer.classList.remove("word--hidden");

    // Hide not found container
    this.notFoundContainer.classList.add("not-found--hidden");
  }

  handleError(message, error) {
    // Show error message in search input
    if (this.searchError) {
        this.searchError.textContent = message;
        this.searchError.classList.add('search__error--visible');
    }

    // Handle different error types
    if (error?.type === 'NOT_FOUND') {
        // Hide results first
        this.resultContainer.classList.add('word--hidden');
        // Then show not found message
        this.showNotFound(message);
    } else {
        // For other errors, hide both containers
        this.resultContainer.classList.add('word--hidden');
        this.notFoundContainer.classList.add('not-found--hidden');
        this.showError(message);
    }
}


  hideError() {
    if (this.searchError) {
      this.searchError.classList.remove("search__error--visible");
    }
  }
}
