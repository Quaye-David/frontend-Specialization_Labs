import { Superhero, SuperVillain } from "./characters.js";
import { superheroes, supervillains } from "./characterData.js";
import { BattleSimulator } from "./battleSimulator.js";

// DOM Elements
const heroSelect = document.getElementById("hero-select");
const villainSelect = document.getElementById("villain-select");
const heroInfo = document.getElementById("hero-info");
const villainInfo = document.getElementById("villain-info");
const startBattleBtn = document.getElementById("start-battle");
const resetBattleBtn = document.getElementById("reset-battle");
const battleLog = document.getElementById("battle-log");

let selectedHero = null;
let selectedVillain = null;
let battleSimulator = null;

// Populate select options
function populateSelects() {
  try {
    superheroes.forEach((hero) => {
      const option = document.createElement("option");
      option.value = hero.name;
      option.textContent = hero.name;
      heroSelect.appendChild(option);
    });

    supervillains.forEach((villain) => {
      const option = document.createElement("option");
      option.value = villain.name;
      option.textContent = villain.name;
      villainSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error populating select options:", error);
  }
}

// Update character info
function updateCharacterInfo(character, infoElement) {
  try {
    infoElement.innerHTML = `
            <p><strong>Name:</strong> ${character.name}</p>
            <p><strong>Secret Identity:</strong> ${character.secretIdentity}</p>
            <p><strong>Powers:</strong> ${character.powers.join(", ")}</p>
            ${
              character.weakness
                ? `<p><strong>Weakness:</strong> ${character.weakness}</p>`
                : ""
            }
            ${
              character.nemeses
                ? `<p><strong>Nemesis:</strong> ${character.nemeses}</p>`
                : ""
            }
        `;
  } catch (error) {
    console.error("Error updating character info:", error);
  }
}

// Event Listeners
heroSelect.addEventListener("change", (e) => {
  try {
    selectedHero = superheroes.find((hero) => hero.name === e.target.value);
    updateCharacterInfo(selectedHero, heroInfo);
  } catch (error) {
    console.error("Error selecting hero:", error);
  }
});

villainSelect.addEventListener("change", (e) => {
  try {
    selectedVillain = supervillains.find(
      (villain) => villain.name === e.target.value
    );
    updateCharacterInfo(selectedVillain, villainInfo);
  } catch (error) {
    console.error("Error selecting villain:", error);
  }
});

startBattleBtn.addEventListener("click", () => {
  try {
    if (selectedHero && selectedVillain) {
      const hero = new Superhero(
        selectedHero.name,
        selectedHero.secretIdentity,
        selectedHero.powers,
        selectedHero.weakness
      );
      const villain = new SuperVillain(
        selectedVillain.name,
        selectedVillain.secretIdentity,
        selectedVillain.powers,
        selectedVillain.nemeses
      );
      battleSimulator = new BattleSimulator(hero, villain, battleLog);
      battleSimulator.startBattle();
      startBattleBtn.disabled = true;
    }
  } catch (error) {
    console.error("Error starting battle:", error);
  }
});

resetBattleBtn.addEventListener("click", () => {
  try {
    heroSelect.value = "";
    villainSelect.value = "";
    heroInfo.innerHTML = "";
    villainInfo.innerHTML = "";
    battleLog.innerHTML = "";
    selectedHero = null;
    selectedVillain = null;
    battleSimulator = null;
    startBattleBtn.disabled = false;
  } catch (error) {
    console.error("Error resetting battle:", error);
  }
});

// Initialize
try {
  populateSelects();
} catch (error) {
  console.error("Error initializing application:", error);
}
