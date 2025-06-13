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
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Update toggle button icon
  const toggleBtn = document.querySelector(".dark-toggle");
  toggleBtn.innerHTML = newTheme === "dark" ? "☀️" : "🌙";
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", savedTheme);

  // Set initial toggle button icon
  const toggleBtn = document.querySelector(".dark-toggle");
  toggleBtn.innerHTML = savedTheme === "dark" ? "☀️" : "🌙";
}

document.addEventListener("DOMContentLoaded", initTheme);

window.onload = () => {
  updateCartCount();
  displayCart();
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }
};
