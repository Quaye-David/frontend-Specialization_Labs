// script.js
import { PasswordGenerator } from './modules/passwordGenerator.js';
import { checkStrength } from './modules/strengthChecker.js';

document.addEventListener('DOMContentLoaded', () => {
  const generator = new PasswordGenerator();
  
  const lengthSlider = document.getElementById('character-length');
  const lengthDisplay = document.querySelector('.settings-number');
  const generateBtn = document.getElementById('generate-btn');
  const strengthIndicator = document.getElementById('strength-indicator');
  const passwordDisplay = document.getElementById('generated-password');
  const copyBtn = document.getElementById('copy-btn');

  const checkboxes = {
    uppercase: document.getElementById('include-uppercase'),
    lowercase: document.getElementById('include-lowercase'),
    numbers: document.getElementById('include-numbers'),
    symbols: document.getElementById('include-symbols')
  };

  // Generate and display initial password
  const initialPassword = generator.generate();
  passwordDisplay.textContent = initialPassword;
  updateStrengthIndicator(initialPassword);

  // Copy button functionality
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(passwordDisplay.textContent);
      // Optional: Add visual feedback for copy
      copyBtn.classList.add('copied');
      setTimeout(() => copyBtn.classList.remove('copied'), 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  });

 // Update the updateStrengthIndicator function in script.js
function updateStrengthIndicator(password) {
  const strength = checkStrength(password, generator.options);
  const strengthMeter = document.getElementById('strength-indicator');
  
  // Update text and data attribute
  strengthMeter.textContent = strength.label;
  
  // Map score to strength levels
  let strengthLevel;
  switch (strength.score) {
    case 1:
      strengthLevel = 'too-weak';
      break;
    case 2:
      strengthLevel = 'weak';
      break;
    case 3:
      strengthLevel = 'medium';
      break;
    case 4:
    case 5:
      strengthLevel = 'strong';
      break;
    default:
      strengthLevel = 'too-weak';
  }

  // Set data attribute for CSS styling
  strengthMeter.setAttribute('data-strength', strengthLevel);
  
  // Clear previous content and recreate bars
  strengthMeter.innerHTML = strength.label;
  
  // Create and append strength bars
  const barsContainer = document.createElement('div');
  barsContainer.className = 'bars-container';
  
  for (let i = 0; i < 4; i++) {
    const bar = document.createElement('div');
    bar.className = 'strength-bars';
    barsContainer.appendChild(bar);
  }
  
  strengthMeter.appendChild(barsContainer);
}

  // Slider functionality
  function updateSliderBackground(slider) {
    const value = slider.value;
    const min = slider.min || 0;
    const max = slider.max || 100;
    const percentage = ((value - min) * 100) / (max - min);
    slider.style.background = `linear-gradient(to right, var(--neon-green) ${percentage}%, var(--very-dark-grey) ${percentage}%)`;
  }

  lengthSlider.addEventListener('input', (e) => {
    generator.length = +e.target.value;
    lengthDisplay.textContent = e.target.value;
    updateSliderBackground(lengthSlider);
  });

  // Checkbox updates
  Object.entries(checkboxes).forEach(([option, checkbox]) => {
    checkbox.addEventListener('change', (e) => {
      generator.options[option] = e.target.checked;
    });
  });

  // Generate new password
  generateBtn.addEventListener('click', () => {
    const password = generator.generate();
    passwordDisplay.textContent = password;
    updateStrengthIndicator(password);
  });

  // Initial slider setup
  updateSliderBackground(lengthSlider);
});

// function to display a toast message when a password is copied
function displayToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    }
    