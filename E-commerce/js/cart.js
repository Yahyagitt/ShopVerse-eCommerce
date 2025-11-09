const CART_KEY = 'shopverse_cart';

let cart = JSON.parse(localStorage.getItem(CART_KEY)) || []

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product) {
  
  const existing = cart.find(item => item.id === product.id);

  if(existing){
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({...product,quantity:1});
  }

  saveCart();
  setTimeout(()=>alert(`${product.name} added to Cart!`), 100);
  console.log(`Added to cart: ${product.name}`, cart);
}

function updateCartCount(){
  const cartIcon = document.getElementById('cart-icon');
  if(!cartIcon) return;
  const total = cart.reduce((sum,item) => sum + item.quantity, 0);
  cartIcon.textContent = `🛒(${total})`;
}

updateCartCount();