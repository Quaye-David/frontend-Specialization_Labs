// script.js
import { createSuperhero, createSuperVillain } from "./characters.js";
import { superheroes, supervillains } from "./characterData.js";
import { createBattleSimulator } from "./battleSimulator.js";

function createBattleApp() {
    const state = {
        selectedHero: null,
        selectedVillain: null,
        battleSimulator: null,
        isSimulating: false,
        elements: {}
    };

    function initializeElements() {
        try {
            // Get all required DOM elements
            state.elements = {
                heroSelect: document.getElementById('hero-select'),
                villainSelect: document.getElementById('villain-select'),
                heroInfo: document.getElementById('hero-info'),
                villainInfo: document.getElementById('villain-info'),
                startBattleBtn: document.getElementById('start-battle'),
                resetBattleBtn: document.getElementById('reset-battle'),
                battleLog: document.getElementById('battle-log'),
                errorDisplay: document.getElementById('error-display')
            };

            // Validate all elements exist
            Object.entries(state.elements).forEach(([key, element]) => {
                if (!element) {
                    throw new Error(`Required element ${key} not found in the DOM`);
                }
            });

        } catch (error) {
            handleError('Failed to initialize DOM elements', error);
        }
    }

    function bindEvents() {
        try {
            // Character selection events
            state.elements.heroSelect.addEventListener('change', (e) => {
                const selectedHero = superheroes.find(hero => hero.name === e.target.value);
                if (selectedHero) {
                    state.selectedHero = selectedHero;
                    updateCharacterInfo(selectedHero, state.elements.heroInfo);
                    updateBattleButtonState();
                }
            });

            state.elements.villainSelect.addEventListener('change', (e) => {
                const selectedVillain = supervillains.find(villain => villain.name === e.target.value);
                if (selectedVillain) {
                    state.selectedVillain = selectedVillain;
                    updateCharacterInfo(selectedVillain, state.elements.villainInfo);
                    updateBattleButtonState();
                }
            });

            // Battle control events
            state.elements.startBattleBtn.addEventListener('click', startBattle);
            state.elements.resetBattleBtn.addEventListener('click', resetBattle);

            // Error display click to dismiss
            state.elements.errorDisplay.addEventListener('click', () => {
                state.elements.errorDisplay.classList.add('hidden');
            });

        } catch (error) {
            handleError('Failed to bind events', error);
        }
    }

    function updateBattleButtonState() {
        state.elements.startBattleBtn.disabled = !(state.selectedHero && state.selectedVillain) || state.isSimulating;
    }

    function updateCharacterInfo(character, infoElement) {
        try {
            const { name, secretIdentity, powers, weakness, nemeses } = character;
            infoElement.innerHTML = `
                <div class="character-card">
                    <h3>${name}</h3>
                    <p><strong>Secret Identity:</strong> ${secretIdentity}</p>
                    <p><strong>Powers:</strong> ${powers.join(", ")}</p>
                    ${weakness ? `<p><strong>Weakness:</strong> ${weakness}</p>` : ''}
                    ${nemeses ? `<p><strong>Nemesis:</strong> ${nemeses}</p>` : ''}
                    <p><strong>Health:</strong> <span class="health-bar">${character.health}</span></p>
                </div>
            `;
        } catch (error) {
            handleError('Failed to update character info', error);
        }
    }

    function populateSelect(selectElement, characters, characterType) {
        try {
            // Clear existing options except the default one
            selectElement.innerHTML = `<option value="">Choose a ${characterType}</option>`;
            
            // Add character options
            characters.forEach(character => {
                const option = document.createElement('option');
                option.value = character.name;
                option.textContent = character.name;
                selectElement.appendChild(option);
            });
        } catch (error) {
            handleError(`Failed to populate ${characterType} select`, error);
        }
    }

    async function startBattle() {
        try {
            if (!state.selectedHero || !state.selectedVillain) {
                throw new Error('Please select both a hero and a villain');
            }

            state.isSimulating = true;
            updateBattleButtonState();
            state.elements.battleLog.innerHTML = ''; // Clear previous battle log

            // Create fresh instances for the battle
            const hero = createSuperhero({
                name: state.selectedHero.name,
                secretIdentity: state.selectedHero.secretIdentity,
                powers: state.selectedHero.powers,
                weakness: state.selectedHero.weakness
            });

            const villain = createSuperVillain({
                name: state.selectedVillain.name,
                secretIdentity: state.selectedVillain.secretIdentity,
                powers: state.selectedVillain.powers,
                nemeses: state.selectedVillain.nemeses
            });

            state.battleSimulator = createBattleSimulator(
                hero, 
                villain, 
                state.elements.battleLog,
                state.elements.errorDisplay
            );

            await state.battleSimulator.startBattle();

        } catch (error) {
            handleError('Battle failed to start', error);
        } finally {
            state.isSimulating = false;
            updateBattleButtonState();
        }
    }

    function resetBattle() {
        try {
            // Reset selections
            state.elements.heroSelect.value = '';
            state.elements.villainSelect.value = '';
            
            // Clear info displays
            state.elements.heroInfo.innerHTML = '';
            state.elements.villainInfo.innerHTML = '';
            state.elements.battleLog.innerHTML = '';
            
            // Reset state
            state.selectedHero = null;
            state.selectedVillain = null;
            state.battleSimulator = null;
            state.isSimulating = false;
            
            // Update UI state
            updateBattleButtonState();
            
        } catch (error) {
            handleError('Failed to reset battle', error);
        }
    }

    function handleError(message, error) {
        console.error(message, error);
        
        const errorDisplay = state.elements?.errorDisplay;
        if (errorDisplay) {
            errorDisplay.textContent = `Error: ${message}`;
            errorDisplay.classList.remove('hidden');
            
            // Auto-hide error after 5 seconds
            setTimeout(() => {
                errorDisplay.classList.add('hidden');
            }, 5000);
        }
    }

    function initialize() {
        try {
            // Populate character selects
            populateSelect(state.elements.heroSelect, superheroes, 'Hero');
            populateSelect(state.elements.villainSelect, supervillains, 'Villain');
            
            // Initialize battle button state
            updateBattleButtonState();
            
        } catch (error) {
            handleError('Failed to initialize application', error);
        }
    }

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        initializeElements();
        bindEvents();
        initialize();
    });

    return state;
}

// Initialize the application
createBattleApp();