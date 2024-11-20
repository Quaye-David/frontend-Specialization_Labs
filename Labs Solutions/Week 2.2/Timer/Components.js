function createTimer(duration, elementId) {
  let remainingTime = duration;
  const element = document.getElementById(elementId);
  let timerInterval = null;

if (!element || element.tagName !== 'DIV' || typeof element.className !== 'string') {
        console.error('Element not found or invalid element.');
        return;
}

  const updateDisplay = () => {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      element.textContent = `Time remaining: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  this.start = function () {
      if (timerInterval) {
          clearInterval(timerInterval);
      }
      timerInterval = setInterval(() => {
          remainingTime--;
          if (remainingTime <= 0) {
              clearInterval(timerInterval);
              console.log('Time is up!');
              element.textContent = 'Time is up!';
          } else {
              updateDisplay();
          }
      }, 1000);
  };

  this.reset = function () {
      clearInterval(timerInterval);
      remainingTime = duration;
      element.textContent = 'Timer reset.';
  };
}

const timerDisplay = document.getElementById('timer-display');
const timerInput = document.getElementById('timer-input');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const errorMessage = document.getElementById('error-message');

let timerInstance;

startBtn.addEventListener('click', function () {
  const duration = parseInt(timerInput.value);
  if (isNaN(duration) || duration <= 0) {
      errorMessage.textContent = 'Please enter a valid positive number.';
      return;
  }
  errorMessage.textContent = '';
  timerInstance = new createTimer(duration, 'timer-display');
  timerInstance.start();
});

resetBtn.addEventListener('click', function () {
  if (timerInstance) {
      timerInstance.reset();
  }
  timerInput.value = '';
  errorMessage.textContent = '';
});