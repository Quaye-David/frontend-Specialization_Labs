function createTimer(duration, elementId) {
    // Validate duration
    if (typeof duration !== 'number' || duration <= 0) {
        throw new Error('Duration must be a positive number');
    }

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
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }, 1000);
        },
        update: function() {
            element.textContent = `Time remaining: ${remainingTime} seconds`;
        },
        stop: function() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        },
        reset: function(newDuration) {
            if (typeof newDuration !== 'number' || newDuration <= 0) {
                throw new Error('New duration must be a positive number');
            }
            this.stop();
            remainingTime = newDuration;
            this.update();
            this.start();
        }
    };

    return timer;
}