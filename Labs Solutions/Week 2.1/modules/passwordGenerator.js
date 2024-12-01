const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

export class PasswordGenerator {
  constructor(options = {}) {
    this.length = options.length || 10;
    this.options = {
      uppercase: options.uppercase !== undefined ? options.uppercase : true,
      lowercase: options.lowercase !== undefined ? options.lowercase : true,
      numbers: options.numbers !== undefined ? options.numbers : true,
      symbols: options.symbols !== undefined ? options.symbols : false
    };
  }

    generate() {
      const enabledSets = Object.keys(this.options).filter(key => this.options[key]);
      if (enabledSets.length === 0) {
        console.error('No character sets selected');
        return '';
      }
  
      const chars = enabledSets.map(set => CHAR_SETS[set]).join('');
  
      const password = Array.from({ length: this.length }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      ).join('');
  
      return password;
    }
  }