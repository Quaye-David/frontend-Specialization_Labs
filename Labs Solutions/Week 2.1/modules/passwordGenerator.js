const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};
export class PasswordGenerator {
  constructor() {
    this.length = 10;
    this.options = {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false
    };
  }

  generate() {
    let chars = '';
    if (this.options.uppercase) chars += CHAR_SETS.uppercase;
    if (this.options.lowercase) chars += CHAR_SETS.lowercase;
    if (this.options.numbers) chars += CHAR_SETS.numbers;
    if (this.options.symbols) chars += CHAR_SETS.symbols;

    if (!chars) return '';

    return Array.from(
      { length: this.length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  }
}