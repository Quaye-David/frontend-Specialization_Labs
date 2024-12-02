const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

export class PasswordGenerator {
  constructor({
    length = 10,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = false
  } = {}) {
    this.length = length;
    this.options = { uppercase, lowercase, numbers, symbols };
  }

  generate() {
    const { options } = this;
    const enabledSets = Object.keys(options).filter(key => options[key]);
    
    if (enabledSets.length === 0) {
      console.error('No character sets selected');
      return '';
    }

    const chars = enabledSets.map(set => {
      const { [set]: charSet } = CHAR_SETS;
      return charSet;
    }).join('');

    const [...password] = Array.from(
      { length: this.length }, 
      () => chars[Math.floor(Math.random() * chars.length)]
    );

    return password.join('');
  }
}