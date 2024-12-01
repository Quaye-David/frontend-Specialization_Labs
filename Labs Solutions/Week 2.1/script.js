// script.js
import { PasswordGenerator } from "./modules/passwordGenerator.js";
import { checkStrength } from "./modules/strengthChecker.js";

document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const elements = {
    lengthSlider: document.getElementById("character-length"),
    lengthDisplay: document.querySelector(".settings-number"),
    generateBtn: document.getElementById("generate-btn"),
    strengthIndicator: document.getElementById("strength-indicator"),
    passwordDisplay: document.getElementById("generated-password"),
    copyBtn: document.getElementById("copy-btn"),
    checkboxes: {
      uppercase: document.getElementById("include-uppercase"),
      lowercase: document.getElementById("include-lowercase"),
      numbers: document.getElementById("include-numbers"),
      symbols: document.getElementById("include-symbols"),
    },
  };

  elements.copyBtn.disabled = true;
  elements.copyBtn.classList.add("disabled");

  const generator = new PasswordGenerator();

  const updatePassword = (password) => {
    elements.passwordDisplay.textContent = password;
    elements.passwordDisplay.parentElement.classList.add("has-password");
    elements.copyBtn.disabled = false;
    elements.copyBtn.classList.remove("disabled");
    updateStrengthIndicator(password);
  };

  const updateStrengthIndicator = (password) => {
    const strength = checkStrength(password, generator.options);
    elements.strengthIndicator.textContent = strength.label;
    elements.strengthIndicator.setAttribute('data-strength', strength.level);
    elements.strengthIndicator.appendChild(createStrengthBars());
  };

  const createStrengthBars = () => {
    const container = document.createElement("div");
    container.className = "bars-container";
    container.append(
      ...Array(4)
        .fill(0)
        .map(() => {
          const bar = document.createElement("div");
          bar.className = "strength-bars";
          return bar;
        })
    );
    return container;
  };

  // Event Listeners
  elements.copyBtn.addEventListener("click", async () => {
    const copyText = elements.copyBtn.querySelector(".copy-text");
    try {
      await navigator.clipboard.writeText(elements.passwordDisplay.textContent);
      copyText.classList.add("show");
      setTimeout(() => copyText.classList.remove("show"), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  });

  function updateSliderBackground(slider) {
    const value = slider.value;
    const min = slider.min || 0;
    const max = slider.max || 100;
    const percentage = ((value - min) * 100) / (max - min);
    slider.style.background = `linear-gradient(to right, var(--neon-green) ${percentage}%, var(--very-dark-grey) ${percentage}%)`;
  }

  // Update event listener
  elements.lengthSlider.addEventListener("input", (e) => {
    generator.length = +e.target.value;
    elements.lengthDisplay.textContent = e.target.value;
    updateSliderBackground(e.target);
  });

  Object.entries(elements.checkboxes).forEach(([option, checkbox]) => {
    checkbox.addEventListener("change", (e) => {
      generator.options[option] = e.target.checked;
    });
  });

  elements.generateBtn.addEventListener("click", () => {
    if (
      !Object.values(elements.checkboxes).some((checkbox) => checkbox.checked)
    ) {
      elements.passwordDisplay.textContent =
        "Please select at least one option";
      elements.passwordDisplay.classList.add("error-message");
      return;
    }
    elements.passwordDisplay.classList.remove("error-message");
    updatePassword(generator.generate());
  });

  // Initial Setup
  updateSliderBackground(elements.lengthSlider);
});
