let countdown = 60;

function updateCounter() {
  const counter = document.getElementById("rate-counter");
  if (counter) {
    const mins = String(Math.floor(countdown / 60)).padStart(2, "0");
    const secs = String(countdown % 60).padStart(2, "0");
    counter.textContent = `${mins}:${secs}`;
  }
}

function refreshRates() {
  // TODO: Add your rate refresh logic here (API call, etc.)
  // For now, just log to console
  console.log("Rates refreshed!");
}

function startCountdown() {
  updateCounter();
  setInterval(() => {
    countdown--;
    if (countdown < 0) {
      refreshRates();
      countdown = 60;
    }
    updateCounter();
  }, 1000);
}

document.addEventListener("DOMContentLoaded", startCountdown);

// Rate API Checker
