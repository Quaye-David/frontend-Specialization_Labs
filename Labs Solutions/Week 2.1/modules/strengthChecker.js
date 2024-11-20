// strengthChecker.js
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

  const strengthLabels = {
    1: 'TOO WEAK!',
    2: 'WEAK',
    3: 'MEDIUM',
    4: 'STRONG',
    5: 'VERY STRONG'
  };

  return {
    score,
    label: strengthLabels[score],
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