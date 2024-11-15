// DOM Elements
const adviceButton = document.getElementById("adviceButton");
const adviceText = document.getElementById("advice");
const adviceNumberElement = document.querySelector(".advice-number");

// API endpoint (for reference)
const API_ENDPOINT = 'https://api.adviceslip.com/advice';

// Advice data bank
const adviceBank = [
    { advice: "Take one step at a time." },
    { advice: "Don't be afraid to ask for help." },
    { advice: "Learn from your mistakes." },
    { advice: "Practice makes perfect." },
    { advice: "Stay curious and keep learning." },
    { advice: "Be kind to yourself." },
    { advice: "Take breaks when needed." },
    { advice: "Celebrate small victories." },
    { advice: "Listen more than you speak." },
    { advice: "Start before you're ready." }
];

// Simulate API delay
const simulateApiCall = async (advice) => {
    const delay = Math.random() * 2000 + 1000; // Random delay between 1-3 seconds
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) { // 90% success rate
                resolve({
                    id: Math.floor(Math.random() * 100),
                    advice: advice
                });
            } else {
                reject(new Error("Failed to fetch advice"));
            }
        }, delay);
    });
};

// Update UI states
const updateUIState = {
    loading: () => {
        adviceButton.disabled = true;
        adviceText.classList.add('loading');
        adviceText.innerText = 'Finding wisdom...';
        adviceNumberElement.innerText = '';
    },
    success: (data) => {
        adviceButton.disabled = false;
        adviceText.classList.remove('loading');
        adviceText.innerText = data.advice;
        adviceNumberElement.innerText = `ADVICE #${data.id}`;
    },
    error: (message) => {
        adviceButton.disabled = false;
        adviceText.classList.remove('loading');
        adviceText.innerText = `🚫 ${message}`;
        adviceNumberElement.innerText = 'ERROR';
        adviceText.classList.add('error');
        setTimeout(() => adviceText.classList.remove('error'), 3000);
    }
};

// Fetch advice with retries
async function fetchAdvice(retries = 3) {
    const randomAdvice = adviceBank[Math.floor(Math.random() * adviceBank.length)].advice;
    
    for (let i = 0; i < retries; i++) {
        try {
            updateUIState.loading();
            const data = await simulateApiCall(randomAdvice);
            updateUIState.success(data);
            return;
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
            if (i === retries - 1) {
                updateUIState.error("Couldn't fetch advice. Please try again.");
            }
        }
    }
}

// Event Listeners
adviceButton.addEventListener("click", () => {
    fetchAdvice();
});

// Initialize
document.addEventListener('DOMContentLoaded', fetchAdvice);