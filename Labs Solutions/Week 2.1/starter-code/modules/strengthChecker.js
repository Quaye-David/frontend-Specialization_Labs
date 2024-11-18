// strengthChecker.js
export const checkStrength = (password, options) => {
  let score = 0;
  
  // Base score on enabled options and password length
  if (password.length >= 8) score++;
  if (options.uppercase && /[A-Z]/.test(password)) score++;
  if (options.lowercase && /[a-z]/.test(password)) score++;
  if (options.numbers && /\d/.test(password)) score++;
  if (options.symbols && /[^A-Za-z0-9]/.test(password)) score++;

  const strengthLabels = {
    1: 'TOO WEAK!',
    2: 'WEAK',
    3: 'MEDIUM',
    4: 'STRONG',
    5: 'STRONG'
  };

  return {
    score,
    label: strengthLabels[score] || 'TOO WEAK!'
  };
};