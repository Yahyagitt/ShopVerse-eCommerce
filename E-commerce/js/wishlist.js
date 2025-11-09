
const WISHLIST_KEY = "shopverse_wishlist";
const WISHLIST_UPDATED_KEY = "shopverse_wishlist_lastUpdated";




let wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];



const wishlistContainer = document.getElementById("wishlist-items");
const wishlistCount = document.getElementById("wishlist-count");
const clearWishlistBtn = document.getElementById("clear-wishlist");
const cartIcon = document.getElementById("cart-icon");


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('shopverse_cart')) || [];
    const countElement = document.querySelector("#cart-icon");
    if (countElement) countElement.textContent = `🛒 (${cart.length})`;
  }
  updateCartCount();
  
  


function saveData() {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  
  localStorage.setItem(WISHLIST_UPDATED_KEY, String(Date.now()));
}


function renderWishlist() {
  wishlistContainer.innerHTML = "";

  if (!wishlist.length) {
    wishlistContainer.innerHTML = `<p class="empty-cart">💔 Your wishlist is empty.</p>`;
    wishlistCount.textContent = 0;
    return;
  }

  wishlist.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("wishlist-item");
    div.innerHTML = `
    <div class="wishlist-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
        </div>
        <div class="item-actions">
            <button class="add-to-cart-btn">Add to Cart 🛒</button>
            <button class="remove-btn">Remove ❌</button>
        </div>
    </div>
`;



   
    div.querySelector(".add-to-cart-btn").addEventListener("click", () => {
      addToCart(item);
    });

    div.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromWishlist(item.id);
    });

    wishlistContainer.appendChild(div);
  });

  wishlistCount.textContent = wishlist.length;
}


function addToCart(item) {
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  
  wishlist = wishlist.filter(i => i.id !== item.id);

  saveData();
  renderWishlist();
  updateCartCount();

  
  const toast = document.createElement("div");
  toast.textContent = `${item.name} added to cart`;
  toast.style.position = "fixed";
  toast.style.right = "20px";
  toast.style.bottom = "20px";
  toast.style.background = "#000";
  toast.style.color = "#fff";
  toast.style.padding = "10px 14px";
  toast.style.borderRadius = "8px";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1500);
}


function removeFromWishlist(id) {
  wishlist = wishlist.filter(i => i.id !== id);
  saveData();
  renderWishlist();
}


clearWishlistBtn?.addEventListener("click", () => {
  if (!confirm("Are you sure you want to clear your wishlist?")) return;
  wishlist = [];
  saveData();
  renderWishlist();

  
  const toast = document.createElement("div");
  toast.textContent = `Wishlist cleared`;
  toast.style.position = "fixed";
  toast.style.right = "20px";
  toast.style.bottom = "20px";
  toast.style.background = "#000";
  toast.style.color = "#fff";
  toast.style.padding = "10px 14px";
  toast.style.borderRadius = "8px";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1200);
});


renderWishlist();
updateCartCount();
