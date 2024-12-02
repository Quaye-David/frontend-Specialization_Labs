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

/**
 * The state.js module exports a DictionaryState class instance named state. The class has the following methods:
 *  - setState: updates the current word in the state and notifies all listeners.
 * - setFont: updates the current font in the state and notifies all font listeners.
 * - subscribe: adds a listener to the state and returns a function to remove the listener.
 * - subscribeFontChange: adds a font listener to the state and returns a function to remove the listener.
 * - notify: notifies all listeners with the provided data.
 */