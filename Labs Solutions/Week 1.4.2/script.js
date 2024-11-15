class Clock {
  constructor() {
    this.is24Hour = true;
    this.isDigital = true;
    this.alarmTime = null;
    this.digitalDisplay = document.getElementById("digital-display");
    this.analogDisplay = document.getElementById("analog-display");
    this.colors = ["#333", "#e74c3c", "#2ecc71", "#3498db", "#9b59b6"];
    this.currentColorIndex = 0;

    // Initialize the clock
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    // Event listeners
    document
      .getElementById("toggle-display")
      .addEventListener("click", () => this.toggleDisplay());
    document
      .getElementById("toggle-format")
      .addEventListener("click", () => this.toggleFormat());
    document
      .getElementById("change-color")
      .addEventListener("click", () => this.changeColor());
    document
      .getElementById("set-alarm")
      .addEventListener("click", () => this.setAlarm());
  }

  getCurrentTime() {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    };
  }

  getFormattedTime() {
    const time = this.getCurrentTime();
    const hours = this.is24Hour ? time.hours : time.hours % 12 || 12;
    const ampm = this.is24Hour ? "" : time.hours >= 12 ? " PM" : " AM";
    return `${String(hours).padStart(2, "0")}:${String(time.minutes).padStart(2, "0")}:${String(time.seconds).padStart(2, "0")}${ampm}`;
  }

  updateAnalogClock() {
    const time = this.getCurrentTime();

    // Calculate angles for hands
    const secondAngle = time.seconds * 6;
    const minuteAngle = time.minutes * 6 + time.seconds * 0.1;
    const hourAngle = (time.hours % 12) * 30 + time.minutes * 0.5;

    // Update hand positions
    this.setHandPosition(".second-hand", secondAngle);
    this.setHandPosition(".minute-hand", minuteAngle);
    this.setHandPosition(".hour-hand", hourAngle);
  }

  setHandPosition(selector, angle) {
    const hand = this.analogDisplay.querySelector(selector);
    if (hand) {
      hand.style.transform = `rotate(${angle}deg)`;
    }
  }

  updateClock() {
    try {
      if (this.isDigital) {
        this.digitalDisplay.textContent = this.getFormattedTime();
      } else {
        this.updateAnalogClock();
      }
      this.checkAlarm();
    } catch (error) {
      console.error("Error updating the clock:", error);
    }
  }

  toggleDisplay() {
    this.isDigital = !this.isDigital;
    this.digitalDisplay.classList.toggle("hidden");
    this.analogDisplay.classList.toggle("hidden");
  }

  toggleFormat() {
    this.is24Hour = !this.is24Hour;
    if (this.isDigital) {
      this.updateClock();
    }
  }

  changeColor() {
    this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    const newColor = this.colors[this.currentColorIndex];

    if (this.isDigital) {
      this.digitalDisplay.style.color = newColor;
    } else {
      const hands = this.analogDisplay.querySelectorAll(".hand");
      hands.forEach((hand) => (hand.style.stroke = newColor));
    }
  }

  setAlarm() {
    const alarmInput = document.getElementById("alarm-time");
    if (this.validateAlarmInput(alarmInput.value)) {
      this.alarmTime = alarmInput.value;
      alert(`Alarm set for ${this.alarmTime}`);
    } else {
      alert("Invalid time format. Please use HH:MM.");
    }
  }

  validateAlarmInput(value) {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timePattern.test(value);
  }

  checkAlarm() {
    if (this.alarmTime) {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      if (currentTime === this.alarmTime) {
        alert("ALARM!");
        this.alarmTime = null;
        document.getElementById("alarm-time").value = "";
      }
    }
  }
}

// Initialize the clock
const clock = new Clock();