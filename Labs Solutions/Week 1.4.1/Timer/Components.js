// FILE: components.js
function createTimer(duration, elementId) {
    // Private state
    let remainingTime = duration;
    let intervalId = null;
    
    // Get DOM element
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error(`Element with id ${elementId} not found`);
    }

    // Timer object with methods
    const timer = {
        start: function() {
            if (intervalId) return; // Prevent multiple starts
            
            this.update(); // Initial update
            intervalId = setInterval(() => {
                remainingTime--;
                this.update();
                
                if (remainingTime <= 0) {
                    this.stop();
                    console.log('Timer completed!');
                }
            }, 1000);
        },

        stop: function() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        },

        reset: function() {
            this.stop();
            remainingTime = duration;
            this.update();
        },

        update: function() {
            element.textContent = `Time remaining: ${remainingTime} seconds`;
        },

        getTimeRemaining: function() {
            return remainingTime;
        }
    };

    return timer;
}