class AppState {
    constructor() {
        this.state = {
            theme : 'light',
            font : 'sans-serif',
            searchTerm : '',
            wordData: null,
            loading: false,
            error: null
        };
        this.listeners = [];
    }

    // State management methods for subscribing to state changes
    subscribe(listener){
        this.listeners.push(listener);
        return () => this.listeners = this.listeners.filter(l => l !== listener);
    }
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.listeners.forEach(listener => listener(this.state));
    }
}

export const appState = new AppState();

/**
 * The AppState class is a simple class that manages the state of the application. It has a state object that holds the current state of the application, and a listeners array that holds the listeners that are subscribed to the state changes. It has two methods, subscribe and setState, that allow components to subscribe to state changes and update the state respectively.
 * 
 * The subscribe method takes a listener function as an argument and adds it to the listeners array. It returns a function that removes the listener from the listeners array when called.
 * 
 * The setState method takes a new state object as an argument, merges it with the current state object using the spread operator, and updates the state object. It then calls each listener in the listeners array with the new state object as an argument.
 */

//Test this module 
