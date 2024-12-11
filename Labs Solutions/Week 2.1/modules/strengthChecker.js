// strengthChecker.js
const STRENGTH_CONFIG = {
  1: { label: 'TOO WEAK!', level: 'too-weak' },
  2: { label: 'WEAK', level: 'weak' },
  3: { label: 'MEDIUM', level: 'medium' },
  4: { label: 'STRONG', level: 'strong' },
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

 // Revised strength determination
 if (password.length < 8) {
  score = 1; // Too Weak
} else if (password.length >= 12 && charTypesCount >= 3) {
  score = 4; // Strong
} else if (password.length >= 8 && charTypesCount >= 2) {
  score = 3; // Medium
} else if (password.length >= 8 && charTypesCount === 1) {
  score = 2; // Weak
} else {
  score = 2; // Default to Weak for any unhandled cases
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