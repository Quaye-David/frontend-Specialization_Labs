// themeManager.js
export class ThemeManager {
  constructor(appState) {
    this.appState = appState;
    this.themeToggle = document.getElementById('theme-switch');
    this.setupListeners();
  }

  setupListeners() {
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    const newTheme = this.appState.state.theme === 'light' ? 'dark' : 'light';
    this.appState.setState({ theme: newTheme });
    document.body.setAttribute('data-theme', newTheme);
    this.themeToggle.classList.toggle('active');
  }
}

/**
 *  
 */