// State management
const state = {
    currentWord: null
};

// DOM elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resultContainer = document.querySelector('.word-details');

// Mock API function (replace with actual API call)
async function fetchWordDefinition(word) {
    // Simulating API call with the provided data
    const mockData = [
        // Your provided JSON data here
    ];
    return mockData.find(item => item.word.toLowerCase() === word.toLowerCase());
}

// Render functions
function renderWord(data) {
    if (!data) {
        resultContainer.classList.add('hidden');
        return;
    }

    document.getElementById('word').textContent = data.word;
    document.getElementById('phonetic-text').textContent = data.phonetic || '';
    
    // Set audio if available
    const audioElement = document.getElementById('pronunciation');
    const audioSource = data.phonetics.find(p => p.audio)?.audio;
    if (audioSource) {
        audioElement.src = audioSource;
        audioElement.style.display = 'block';
    } else {
        audioElement.style.display = 'none';
    }

    document.getElementById('origin').textContent = data.origin;

    // Render meanings
    const meaningsContainer = document.getElementById('meanings');
    meaningsContainer.innerHTML = data.meanings.map(meaning => `
        <div class="meaning">
            <h3 class="part-of-speech">${meaning.partOfSpeech}</h3>
            ${meaning.definitions.map(def => `
                <div class="definition">
                    <p>${def.definition}</p>
                    ${def.example ? `<p class="example">Example: "${def.example}"</p>` : ''}
                </div>
            `).join('')}
        </div>
    `).join('');

    resultContainer.classList.remove('hidden');
}

// Event handlers
searchBtn.addEventListener('click', async () => {
    const word = searchInput.value.trim();
    if (!word) return;

    const definition = await fetchWordDefinition(word);
    state.currentWord = definition;
    renderWord(definition);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});