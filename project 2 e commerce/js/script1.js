const API_KEY = 'AIzaSyDtICCWKC3_Ra1MHGZp2ZXWbqvhj5eIgdc'; // Replace with your API key
const API_URL = `https://www.googleapis.com/books/v1/volumes?maxResults=10&q=fiction&key=${API_KEY}`;
let startIndex = 0;
let cart = [];

// Fetch books
async function fetchBooks(query = "", loadMore = false) {
  const url = `${API_URL}&startIndex=${startIndex}${query ? `&q=${query}` : ''}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayBooks(data.items, loadMore);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Display books
function displayBooks(books, append = false) {
  const booksContainer = document.getElementById('books');
  if (!append) booksContainer.innerHTML = ''; // Clear existing books

  books.forEach(book => {
    const title = book.volumeInfo.title || "No Title";
    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : "No Author";
    const description = book.volumeInfo.description || "No Description";
    const price = book.saleInfo.retailPrice ? `$${book.saleInfo.retailPrice.amount}` : "Price Not Available";

    const bookCard = `
      <div class="book-card">
        <h3>${title}</h3>
        <p><strong>Author(s):</strong> ${authors}</p>
        <p>${description.substring(0, 100)}...</p>
        <p class="price">${price}</p>
        <button onclick="addToCart('${title}', '${price}')">Add to Cart</button>
      </div>
    `;
    booksContainer.insertAdjacentHTML('beforeend', bookCard);
  });
}

// Add to Cart
function addToCart(title, price) {
  cart.push({ title, price: parseFloat(price.replace('$', '')) || 0 });
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

// Load More Books
function loadMoreBooks() {
  startIndex += 10;
  fetchBooks("", true);
}

// Apply Filters
function applyFilters() {
  const searchInput = document.getElementById('search').value;
  startIndex = 0;
  fetchBooks(searchInput, false);
}

// Initial Fetch
fetchBooks();
