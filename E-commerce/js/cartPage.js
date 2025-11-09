
const CART_KEY = 'shopverse_cart'
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

const cartContainer = document.getElementById('cart-items'),
    totalAmount = document.getElementById('cart-total'),
    clearCartBtn = document.getElementById('clear-cart');





function saveCart() {
    localStorage.setItem(CART_KEY,JSON.stringify(cart));
    updateCartCount();
    renderCart();
}


function updateCartCount() {
    const cartIcon = document.getElementById('cart-icon');
    if(!cartIcon) return
    const total = cart.reduce((sum,item) => sum + item.quantity, 0)
    cartIcon.textContent = `🛒(${total})`
}


function renderCart() {
    cartContainer.innerHTML = cart.length
    ?cart
        .map(
            (item) => `
            <div class = "cart-item">
                <img src = "${item.image}" alt=${item.name}>
                <div class = "item-details">
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                    <div class = "quantity-controls"
                    data-id = "${item.id}">
                        <button class = "decrease">➖</button>
                        <span>${item.quantity}</span>
                        <button class = "increase">➕</button>
                    </div>
                </div>
            </div>`
        ).join('')
        :`<p class="empty-cart">Your cart is empty 🛒</p>`;
    updateTotal();
}


function updateTotal() {
    const total = cart.reduce((sum,item) => sum + item.price * item.quantity, 0);
    totalAmount.textContent = `${total.toLocaleString()}`;
}


function changeQuantity(id, type){
    const existing = cart.find((item) => item.id === id);
    if(!existing) return
    //d
    if(type === "increase") existing.quantity++;
    else if(type === "decrease"){
        existing.quantity--;
        if(existing.quantity<=0)
            cart = cart.filter((i) => i.id !== id)
    }
    saveCart();
}

if(clearCartBtn){
    clearCartBtn.addEventListener("click", () => {
        if(confirm("Are you sure you want to clear your cart")){//d
            cart = []
            saveCart();
        }
    })
}


cartContainer.addEventListener("click", (e) => {
    const quantityDiv = e.target.closest(".quantity-controls");
    if(!quantityDiv) return;

    const id = Number(quantityDiv.dataset.id);

    if(e.target.classList.contains("increase")){//d .increase
        changeQuantity(id, "increase");
    } else if(e.target.classList.contains("decrease")){
        changeQuantity(id,"decrease");
    }
});


renderCart();

updateCartCount();

