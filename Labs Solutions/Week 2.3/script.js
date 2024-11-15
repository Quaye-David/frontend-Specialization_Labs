//Referencing the dom elements
const adviceButton = document.getElementById("adviceButton");
const advice = document.getElementById("advice");
const adviceNumber = document.getElementById("adviceNumber");

adviceButton.addEventListener("click", () => {
  const randomAdvice =
    adviceBank[Math.floor(Math.random() * adviceBank.length)];
  advice.innerText = randomAdvice;
});

//Advice Bank
const adviceBank = [
  "Do not be afraid to give up the good to go for the great.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "The only way to do great work is to love what you do.",
  "The best way to predict the future is to create it.",
  "The best preparation for tomorrow is doing your best today.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "The only thing we have to fear is fear itself.",
  "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
  "The best way to find yourself is to lose yourself in the service of others.",
  "The best way to cheer yourself up is to try to cheer somebody else up.",
  "The best way out is always through.",
  "The best way to make your dreams come true is to wake up.",
  "The best way to get started is to quit talking and begin doing.",
  "The best way to get things done is to simply begin.",
  "The best way to get ahead is to be your own competition.",
];
