// Function constructor to create a Date object representing the current time
function CurrentTime() {
    this.date = new Date();
}

// Add methods to the prototype to access the current hour, minute, and second
CurrentTime.prototype.getHours = function() {
    return this.date.getHours();
};

CurrentTime.prototype.getMinutes = function() {
    return this.date.getMinutes();
};

CurrentTime.prototype.getSeconds = function() {
    return this.date.getSeconds();
};

CurrentTime.prototype.updateTime = function() {
    this.date = new Date();
};

// Example usage
try {
    const currentTime = new CurrentTime();

    // Function to log the current time
    function logCurrentTime() {
        currentTime.updateTime();
        console.log(`Current Time: ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`);
    }

    // Log the current time every second
    setInterval(logCurrentTime, 1000);
} catch (error) {
    console.error('Error:', error.message);
}