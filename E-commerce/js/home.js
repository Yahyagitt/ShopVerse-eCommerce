


const PRODUCTS_API = "https://fakestoreapi.com/products";
const PRODUCTS_KEY = "shopverse_products";

const WISHLIST_KEY = 'shopverse_wishlist';
const WISHLIST_UPDATED_KEY = 'shopverse_wishlist_lastUpdated';

let wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
let products = [];

function loadWishlistFromStorage() {
  wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
 
}


function saveWishlistToStorage() {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
 
  localStorage.setItem(WISHLIST_UPDATED_KEY, String(Date.now()));
}

window.addEventListener("load", () => {
  
  setTimeout(() => {
    const shouldShowAlert = sessionStorage.getItem("showWelcome");
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (shouldShowAlert && user) {
      alert(`Welcome back, ${user.username || user.email.split('@')[0]}!`);
      sessionStorage.removeItem("showWelcome");
    }
  }, 100);
});


const productList = document.getElementById("product-list");

window.addEventListener("pageshow", (evt) => {
 
  loadWishlistFromStorage();
  filterProducts(); 
});


window.addEventListener("storage", (e) => {
  if (e.key === WISHLIST_KEY || e.key === WISHLIST_UPDATED_KEY) {
    loadWishlistFromStorage();
    filterProducts();
  }
});


productList.addEventListener("click", (e) => {
  const addBtn = e.target.closest(".add-to-cart");
  if (addBtn) {
    const product = {
      id: Number(addBtn.dataset.id),
      name: addBtn.dataset.name,
      price: parseInt(addBtn.dataset.price),
      image: addBtn.dataset.image
    };
    
    addToCart(product);
    return;
  }

  const wishlistBtn = e.target.closest('.wishlist-btn');
  if (wishlistBtn) {
    
    const id = Number(wishlistBtn.dataset.id);
    const name = wishlistBtn.dataset.name;
    const price = parseInt(wishlistBtn.dataset.price);
    const image = wishlistBtn.dataset.image;

    const existingIndex = wishlist.findIndex(i => i.id === id);

    if (existingIndex === -1) {
      
      wishlist.push({ id, name, price, image });
      wishlistBtn.textContent = "❤️";
      wishlistBtn.classList.add('active');
    } else {
      
      wishlist.splice(existingIndex, 1);
      wishlistBtn.textContent = "🤍";
      wishlistBtn.classList.remove('active');
    }

    saveWishlistToStorage();
  }
});


async function fetchProducts() {
  try {
    const res = await fetch(PRODUCTS_API);
    if (!res.ok) throw new Error("Failed to fetch products");
    const apiProducts = await res.json();

   
    products = apiProducts.map(p => ({
      id: p.id,
      name: p.title,
      category: p.category,
      price: Math.round(p.price * 85), 
      image: p.image,
    }));

    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));

    filterProducts(); 
  } catch (err) {
    console.error("API Fetch failed:", err);
    const cached = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    if (cached.length) {
      products = cached;
      filterProducts();
    } else {
      document.getElementById("product-list").innerHTML = `
        <p class="error">⚠️ Couldn’t load products (check internet or HTTPS).</p>`;
    }
  }
}






const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortOptions = document.getElementById('sortOptions');


function renderProducts(filteredProducts) {
  productList.innerHTML = "";

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    
    const isWishlisted = wishlist.some(item => item.id === product.id);

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-details">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>

        <div class="product-actions">
          <button
            class="btn add-to-cart"
            data-id="${product.id}"
            data-name="${product.name}"
            data-price="${product.price}"
            data-image="${product.image}">
            Add to Cart
          </button>

          <button
            class="wishlist-btn ${isWishlisted ? 'active' : ''}"
            data-id="${product.id}"
            data-name="${product.name}"
            data-price="${product.price}"
            data-image="${product.image}">
            ${isWishlisted ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    `;

    productList.appendChild(card);
  });
}


function filterProducts() {
  const searchText = (searchInput?.value || '').toLowerCase();
  const selectedCategory = categoryFilter?.value || "all";

  let filtered = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText);
    const matchesCategory = 
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  filtered = sortProducts(filtered);
  renderProducts(filtered);
}

function sortProducts(filteredProducts){
  const sortValue = sortOptions?.value;

  if(sortValue === "priceLowHigh"){
    return filteredProducts.sort((a,b) => a.price - b.price);
  }else if(sortValue === "priceHighLow"){
    return filteredProducts.sort((a,b) => b.price - a.price);
  } else if(sortValue === "nameAZ"){
    return filteredProducts.sort((a,b) => a.name.localeCompare(b.name));
  }else if(sortValue === "nameZA"){
    return filteredProducts.sort((a,b) => b.name.localeCompare(a.name));
  } else {
    return filteredProducts;
  }
}


searchInput?.addEventListener("input", filterProducts);
categoryFilter?.addEventListener("change", filterProducts);
sortOptions?.addEventListener("change", filterProducts);



loadWishlistFromStorage();
fetchProducts();

