let elapsed = 0;

function updateCounter() {
  const counter = document.getElementById("rate-counter");
  if (counter) {
    const mins = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const secs = String(elapsed % 60).padStart(2, "0");
    counter.textContent = `${mins}:${secs}`;
  }
}

function startContinuousCounter() {
  updateCounter();
  setInterval(() => {
    elapsed++;
    updateCounter();
  }, 1000);
}

document.addEventListener("DOMContentLoaded", startContinuousCounter);
