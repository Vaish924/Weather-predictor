// Toggle menu visibility
const menuIcon = document.getElementById('menu-icon');
const menu = document.getElementById('menu');

menuIcon.addEventListener('click', () => {
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

// Hide menu when clicking outside
window.addEventListener('click', (e) => {
  if (e.target !== menu && e.target !== menuIcon && !menu.contains(e.target)) {
    menu.style.display = 'none';
  }
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to Cart
function addToCart(title, price) {
  cart.push({ title, price: parseFloat(price.replace('$', '')) || 0 });
  localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to local storage
  updateCart();
}

// Update Cart
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartItems.innerHTML = cart.map(item => `<li>${item.title} - $${item.price.toFixed(2)}</li>`).join('');
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.innerText = `Total: $${total.toFixed(2)}`;
}

// Display Cart
function displayCart() {
  const cartSection = document.getElementById("cart-section");
  updateCart();
  cartSection.style.display = "block";
}

// Load Cart Data on Page Load
document.addEventListener('DOMContentLoaded', () => {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCart();
});

// Handle "Cart" Link Click
document.getElementById('cart-link').addEventListener('click', (e) => {
  e.preventDefault();
  displayCart();
});


