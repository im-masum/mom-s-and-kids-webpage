document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const item = {
        name: event.target.dataset.name,
        price: parseFloat(event.target.dataset.price),
      };
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    });
  });

  document.getElementById("clear-cart").addEventListener("click", () => {
    clearCart();
  });

  document.getElementById("toggle-dark-mode").addEventListener("click", () => {
    toggleDarkMode();
  });
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const counter = document.getElementById("cart-count");
  counter.textContent = cart.length;
  counter.style.display = cart.length > 0 ? "inline-block" : "none";
}

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const list = document.getElementById("cart-items");
  const total = document.getElementById("total");
  let sum = 0;
  list.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    list.appendChild(li);
    sum += item.price;
  });
  total.textContent = `Total: $${sum}`;
}

function clearCart() {
  localStorage.removeItem("cart");
  updateCartCount();
  displayCart();
}

function toggleDarkMode() {
  const body = document.body;
  const isDark = body.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Update toggle button icon
  document.querySelector(".dark-toggle").textContent = isDark ? "🌙" : "☀️";
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);

  // Set initial toggle button icon
  const toggleBtn = document.querySelector(".dark-toggle");
  toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

document.addEventListener("DOMContentLoaded", initTheme);

window.onload = () => {
  updateCartCount();
  displayCart();
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }
};

// Menu Toggle Functionality
function toggleMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  // Create overlay if it doesn't exist
  let overlay = document.querySelector(".nav-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);
  }

  // Toggle classes
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
  overlay.classList.toggle("active");
  body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";

  // Close menu when clicking overlay
  overlay.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
    body.style.overflow = "";
  });

  // Close menu when clicking a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
      overlay.classList.remove("active");
      body.style.overflow = "";
    });
  });
}
