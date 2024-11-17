// Clock Constructor to represent the time
function Clock(hours, minutes, seconds) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
}

Clock.prototype.getFormattedTime = function () {
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(this.hours)}:${pad(this.minutes)}:${pad(this.seconds)}`;
};

Clock.prototype.get12HourTime = function () {
    const isPM = this.hours >= 12;
    const hours12 = this.hours % 12 || 12;
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hours12)}:${pad(this.minutes)}:${pad(this.seconds)} ${isPM ? 'PM' : 'AM'}`;
};

// Factory function to create a Clock instance with the current time
function createCurrentClock() {
    const now = new Date();
    return new Clock(now.getHours(), now.getMinutes(), now.getSeconds());
}

Clock.prototype.update = function () {
    const now = new Date();
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
    this.seconds = now.getSeconds();
};

try {
    const currentClock = createCurrentClock();

    function logCurrentClock() {
        currentClock.update(); // Update time
        console.log("Formatted Time:", currentClock.getFormattedTime());
        console.log("12-Hour Time:", currentClock.get12HourTime());
        console.log("-------------------------------");
    }

    setInterval(logCurrentClock, 1000);
} catch (error) {
    console.error('Error:', error.message);
}
