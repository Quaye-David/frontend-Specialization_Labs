// modules/state.js
class DictionaryState {
    constructor() {
        this.currentWord = null;
        this.currentFont = localStorage.getItem('font') || 'Inter';
        this.listeners = new Set();
        this.fontListeners = new Set();
    }

    setState(newState) {
        this.currentWord = newState;
        this.notify(this.listeners, this.currentWord);
    }

    setFont(newFont) {
        this.currentFont = newFont;
        localStorage.setItem('font', newFont);
        this.notify(this.fontListeners, this.currentFont);
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    subscribeFontChange(listener) {
        this.fontListeners.add(listener);
        return () => this.fontListeners.delete(listener);
    }

    notify(listeners, data) {
        listeners.forEach(listener => listener(data));
    }
}

export const state = new DictionaryState();