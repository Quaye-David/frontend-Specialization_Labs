// strengthChecker.js
const STRENGTH_CONFIG = {
  1: { label: 'TOO WEAK!', level: 'too-weak' },
  2: { label: 'WEAK', level: 'weak' },
  3: { label: 'MEDIUM', level: 'medium' },
  4: { label: 'STRONG', level: 'strong' },
  5: { label: 'VERY STRONG', level: 'strong' }
};

export const checkStrength = (password, options) => {
  // Initialize base score
  let score = 0;
  
  // Check character types present
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[^A-Za-z0-9]/.test(password);
  
  // Count different character types used
  const charTypesCount = [
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols
  ].filter(Boolean).length;

  // Determine strength based on length and character types
  if (password.length < 8) {
    score = 1; // Too Weak
  } else if (password.length >= 8 && charTypesCount === 1) {
    score = 2; // Weak
  } else if (password.length >= 8 && charTypesCount === 2) {
    score = 3; // Medium
  } else if (password.length >= 12 && charTypesCount >= 3) {
    score = 4; // Strong
  } else {
    score = 2; // Default to Weak
  }

  // Additional criteria
  if (options.repeat && /(\w)\1\1/.test(password)) {
    score = Math.max(1, score - 1); // Penalize repeated characters
  }

  // Bonus points
  if (password.length >= 14 && charTypesCount === 4) {
    score = 5; // Very Strong
  }

  return {
    score,
    label: STRENGTH_CONFIG[score].label,
    level: STRENGTH_CONFIG[score].level,
    details: {
      length: password.length,
      hasUppercase,
      hasLowercase,
      hasNumbers,
      hasSymbols,
      charTypesCount
    }
  };
};