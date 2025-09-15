// Toggle Rates/Calculator tab and active border
document.addEventListener("DOMContentLoaded", () => {
  const ratesBtn = document.getElementById("rates-btn");
  const calculatorBtn = document.getElementById("calculator-btn");
  const ratesSection = document.getElementById("rates-section");
  const calculatorSection = document.getElementById("calculator-section");
  if (ratesBtn && calculatorBtn && ratesSection && calculatorSection) {
    ratesBtn.addEventListener("click", function () {
      ratesBtn.classList.add("border-b-4", "border-black", "text-black");
      ratesBtn.classList.remove("border-b-0", "text-gray-700");
      calculatorBtn.classList.remove(
        "border-b-4",
        "border-black",
        "text-black"
      );
      calculatorBtn.classList.add("border-b-0", "text-gray-700");
      ratesSection.classList.remove("hidden");
      calculatorSection.classList.add("hidden");
    });
    calculatorBtn.addEventListener("click", function () {
      calculatorBtn.classList.add("border-b-4", "border-black", "text-black");
      calculatorBtn.classList.remove("border-b-0", "text-gray-700");
      ratesBtn.classList.remove("border-b-4", "border-black", "text-black");
      ratesBtn.classList.add("border-b-0", "text-gray-700");
      calculatorSection.classList.remove("hidden");
      ratesSection.classList.add("hidden");
    });
  }

  // Rates logic
  let rates = {
    BTC: 95000000,
    ETH: 6000000,
    BNB: 400000,
    USDT: 1500,
  };

  async function fetchCrypto() {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,tether&vs_currencies=ngn"
      );
      const data = await res.json();
      rates.BTC = data.bitcoin.ngn;
      rates.ETH = data.ethereum.ngn;
      rates.BNB = data.binancecoin.ngn;
      rates.USDT = data.tether.ngn;
      return true;
    } catch (error) {
      console.error("API fetch error:", error);
      return false;
    }
  }

  function updateRatesUI() {
    const coins = [
      { alt: "Bitcoin", symbol: "BTC" },
      { alt: "USD", symbol: "USDT" },
      { alt: "ethereum", symbol: "ETH" },
      { alt: "bnb", symbol: "BNB" },
    ];

    coins.forEach(({ alt, symbol }) => {
      const rateElement = document
        .querySelector(`#rates-section img[alt='${alt}']`)
        ?.closest(".flex")
        .querySelector(".font-semibold.text-black");

      if (rateElement) {
        rateElement.textContent = `1 ${symbol} ≈ ₦${rates[
          symbol
        ].toLocaleString()}`;
      }
    });
  }

  async function refreshRates() {
    const success = await fetchCrypto();
    updateRatesUI();
    if (!success) {
      // Optionally show error to user
      // alert("Failed to fetch live rates. Showing last known values.");
    }
  }

  // Countdown logic
  let countdown = 60;
  let countdownInterval;
  function updateCounter() {
    const counter = document.getElementById("rate-counter");
    if (counter) {
      const mins = String(Math.floor(countdown / 60)).padStart(2, "0");
      const secs = String(countdown % 60).padStart(2, "0");
      counter.textContent = `${mins}:${secs}`;
    }
  }
  function startCountdown() {
    clearInterval(countdownInterval);
    countdown = 60;
    updateCounter();
    countdownInterval = setInterval(async () => {
      countdown--;
      if (countdown < 0) {
        await refreshRates();
        countdown = 60;
      }
      updateCounter();
    }, 1000);
  }

  // Calculator logic
  const cryptoType = document.getElementById("crypto-type");
  const cryptoAmount = document.getElementById("crypto-amount");
  function updatePlaceholder() {
    if (cryptoType && cryptoAmount) {
      const type = cryptoType.value;
      const rate = rates[type];
      cryptoAmount.placeholder = `1 ${type} = ₦${rate.toLocaleString()}`;
    }
  }
  if (cryptoType && cryptoAmount) {
    cryptoType.addEventListener("change", updatePlaceholder);
    updatePlaceholder();
  }

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

  // Initial fetch and start countdown
  refreshRates();
  startCountdown();

  // Burger menu toggle logic
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

  // Mobile user icon dropdown toggle with timeout
  const mobileUserBtn = document.getElementById("mobile-user-btn");
  const mobileUserDropdown = document.getElementById("mobile-user-dropdown");
  let mobileDropdownTimeout;
  if (mobileUserBtn && mobileUserDropdown) {
    mobileUserBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileUserDropdown.classList.toggle("opacity-0");
      mobileUserDropdown.classList.toggle("pointer-events-none");
      if (!mobileUserDropdown.classList.contains("opacity-0")) {
        clearTimeout(mobileDropdownTimeout);
        mobileDropdownTimeout = setTimeout(() => {
          mobileUserDropdown.classList.add("opacity-0", "pointer-events-none");
        }, 2000);
      }
    });
    document.addEventListener("click", (e) => {
      if (
        !mobileUserBtn.contains(e.target) &&
        !mobileUserDropdown.contains(e.target)
      ) {
        mobileUserDropdown.classList.add("opacity-0", "pointer-events-none");
        clearTimeout(mobileDropdownTimeout);
      }
    });
    if (mobileUserDropdown) {
      mobileUserDropdown.addEventListener("mouseenter", () => {
        clearTimeout(mobileDropdownTimeout);
      });
      mobileUserDropdown.addEventListener("mouseleave", () => {
        mobileDropdownTimeout = setTimeout(() => {
          mobileUserDropdown.classList.add("opacity-0", "pointer-events-none");
        }, 1000);
      });
    }
  }
});
