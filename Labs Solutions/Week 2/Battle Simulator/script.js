// script.js
import { Superhero, SuperVillain } from "./characters.js";
import { superheroes, supervillains } from "./characterData.js";
import { BattleSimulator } from "./battleSimulator.js";

class BattleApp {
    constructor() {
        // Initialize state
        this.selectedHero = null;
        this.selectedVillain = null;
        this.battleSimulator = null;
        this.isSimulating = false;

        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeElements();
            this.bindEvents();
            this.initialize();
        });
    }

    initializeElements() {
        try {
            // Get all required DOM elements
            this.elements = {
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
            Object.entries(this.elements).forEach(([key, element]) => {
                if (!element) {
                    throw new Error(`Required element ${key} not found in the DOM`);
                }
            });

        } catch (error) {
            this.handleError('Failed to initialize DOM elements', error);
        }
    }

    bindEvents() {
        try {
            // Character selection events
            this.elements.heroSelect.addEventListener('change', (e) => {
                const selectedHero = superheroes.find(hero => hero.name === e.target.value);
                if (selectedHero) {
                    this.selectedHero = selectedHero;
                    this.updateCharacterInfo(selectedHero, this.elements.heroInfo);
                    this.updateBattleButtonState();
                }
            });

            this.elements.villainSelect.addEventListener('change', (e) => {
                const selectedVillain = supervillains.find(villain => villain.name === e.target.value);
                if (selectedVillain) {
                    this.selectedVillain = selectedVillain;
                    this.updateCharacterInfo(selectedVillain, this.elements.villainInfo);
                    this.updateBattleButtonState();
                }
            });

            // Battle control events
            this.elements.startBattleBtn.addEventListener('click', () => this.startBattle());
            this.elements.resetBattleBtn.addEventListener('click', () => this.resetBattle());

            // Error display click to dismiss
            this.elements.errorDisplay.addEventListener('click', () => {
                this.elements.errorDisplay.classList.add('hidden');
            });

        } catch (error) {
            this.handleError('Failed to bind events', error);
        }
    }

    updateBattleButtonState() {
        this.elements.startBattleBtn.disabled = !(this.selectedHero && this.selectedVillain) || this.isSimulating;
    }

    updateCharacterInfo(character, infoElement) {
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
            this.handleError('Failed to update character info', error);
        }
    }

    populateSelect(selectElement, characters, characterType) {
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
            this.handleError(`Failed to populate ${characterType} select`, error);
        }
    }

    async startBattle() {
        try {
            if (!this.selectedHero || !this.selectedVillain) {
                throw new Error('Please select both a hero and a villain');
            }

            this.isSimulating = true;
            this.updateBattleButtonState();
            this.elements.battleLog.innerHTML = ''; // Clear previous battle log

            // Create fresh instances for the battle
            const hero = new Superhero({
                name: this.selectedHero.name,
                secretIdentity: this.selectedHero.secretIdentity,
                powers: this.selectedHero.powers,
                weakness: this.selectedHero.weakness
            });

            const villain = new SuperVillain({
                name: this.selectedVillain.name,
                secretIdentity: this.selectedVillain.secretIdentity,
                powers: this.selectedVillain.powers,
                nemeses: this.selectedVillain.nemeses
            });

            this.battleSimulator = new BattleSimulator(
                hero, 
                villain, 
                this.elements.battleLog,
                this.elements.errorDisplay
            );

            await this.battleSimulator.startBattle();

        } catch (error) {
            this.handleError('Battle failed to start', error);
        } finally {
            this.isSimulating = false;
            this.updateBattleButtonState();
        }
    }

    resetBattle() {
        try {
            // Reset selections
            this.elements.heroSelect.value = '';
            this.elements.villainSelect.value = '';
            
            // Clear info displays
            this.elements.heroInfo.innerHTML = '';
            this.elements.villainInfo.innerHTML = '';
            this.elements.battleLog.innerHTML = '';
            
            // Reset state
            this.selectedHero = null;
            this.selectedVillain = null;
            this.battleSimulator = null;
            this.isSimulating = false;
            
            // Update UI state
            this.updateBattleButtonState();
            
        } catch (error) {
            this.handleError('Failed to reset battle', error);
        }
    }

    handleError(message, error) {
        console.error(message, error);
        
        const errorDisplay = this.elements?.errorDisplay;
        if (errorDisplay) {
            errorDisplay.textContent = `Error: ${message}`;
            errorDisplay.classList.remove('hidden');
            
            // Auto-hide error after 5 seconds
            setTimeout(() => {
                errorDisplay.classList.add('hidden');
            }, 5000);
        }
    }

    initialize() {
        try {
            // Populate character selects
            this.populateSelect(this.elements.heroSelect, superheroes, 'Hero');
            this.populateSelect(this.elements.villainSelect, supervillains, 'Villain');
            
            // Initialize battle button state
            this.updateBattleButtonState();
            
        } catch (error) {
            this.handleError('Failed to initialize application', error);
        }
    }
}

// Initialize the application
new BattleApp();