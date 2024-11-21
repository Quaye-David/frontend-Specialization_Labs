// theme.service.js
export class ThemeService {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIndicator = document.querySelector('.theme-toggle__indicator');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.initialize();
    }

    initialize() {
        document.body.setAttribute('data-theme', this.currentTheme);
        if (this.currentTheme === 'dark') {
            this.themeIndicator.style.transform = 'translateX(20px)';
        }
        
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', this.currentTheme);
        this.themeIndicator.style.transform = 
            this.currentTheme === 'dark' ? 'translateX(20px)' : 'translateX(0)';
        localStorage.setItem('theme', this.currentTheme);
    }
}