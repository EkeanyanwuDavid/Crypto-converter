// Toggle Rates/Calculator tab and active border
document.addEventListener("DOMContentLoaded", () => {
  const ratesBtn = document.getElementById("rates-btn");
  const calcBtn = document.getElementById("calculator-btn");
  const ratesSection = document.getElementById("rates-section");
  const calculatorSection = document.getElementById("calculator-section");
  if (ratesBtn && calcBtn && ratesSection && calculatorSection) {
    ratesBtn.addEventListener("click", function () {
      ratesBtn.classList.add("border-b-4", "border-black", "text-black");
      ratesBtn.classList.remove("border-b-0", "text-gray-700");
      calcBtn.classList.remove("border-b-4", "border-black", "text-black");
      calcBtn.classList.add("border-b-0", "text-gray-700");
      ratesSection.classList.remove("hidden");
      calculatorSection.classList.add("hidden");
    });
    calcBtn.addEventListener("click", function () {
      calcBtn.classList.add("border-b-4", "border-black", "text-black");
      calcBtn.classList.remove("border-b-0", "text-gray-700");
      ratesBtn.classList.remove("border-b-4", "border-black", "text-black");
      ratesBtn.classList.add("border-b-0", "text-gray-700");
      calculatorSection.classList.remove("hidden");
      ratesSection.classList.add("hidden");
    });
  }
});
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

document.addEventListener("DOMContentLoaded", () => {
  startCountdown();

  // Calculator logic
  const rates = {
    BTC: 95000000, // 1 BTC = 95,000,000 NGN
    ETH: 6000000, // 1 ETH = 6,000,000 NGN
    BNB: 400000, // 1 BNB = 400,000 NGN
    USDT: 1500, // 1 USDT = 1,500 NGN
  };

  const calcBtn = document.getElementById("calc-btn");
  if (calcBtn) {
    calcBtn.addEventListener("click", function () {
      const type = document.getElementById("crypto-type").value;
      const amount = parseFloat(document.getElementById("crypto-amount").value);
      const resultDiv = document.getElementById("naira-result");
      if (!isNaN(amount) && rates[type]) {
        const naira = amount * rates[type];
        resultDiv.textContent = `${amount} ${type} = ₦${naira.toLocaleString()}`;
      } else {
        resultDiv.textContent = "Enter a valid amount.";
      }
      setTimeout(() => {
        resultDiv.textContent = "";
      }, 10000);
    });
  }
});

// Burger menu toggle logic
document.addEventListener("DOMContentLoaded", function () {
  const burgerBtn = document.getElementById("burger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenu = document.getElementById("close-menu");
  if (burgerBtn && mobileMenu && closeMenu) {
    burgerBtn.addEventListener("click", function () {
      mobileMenu.classList.remove("hidden");
    });
    closeMenu.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
    });
  }
});
