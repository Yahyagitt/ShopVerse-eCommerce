

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

const cartBtn = document.querySelector("#cart-icon"),
    cartSidebar = document.querySelector(".cart-sidebar"),
    closeCartBtn = document.querySelector('.close-cart-btn'),
    overlay = document.querySelector('.cart-sidebar-overlay');


function openCartSidebar(){
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
}


function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
}


cartBtn.addEventListener("click", openCartSidebar);

closeCartBtn.addEventListener("click", closeCartSidebar);

overlay.addEventListener("click", closeCartSidebar);




const cartSidebarItems = document.getElementById('cartSidebarItems'),
    sidebarTotal = document.getElementById('sidebarTotal');


function renderCartSidebar() {
    
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    cartSidebarItems.innerHTML = cart.length 
        ? cart
            .map(
                (item) => `
                <div class="cart-sidebar-item">
                    <p>${item.name} × ${item.quantity}</p>
                </div>`
            ).join('')
        :  `<p class="empty-msg">Your cart is empty 🛒</p>`;


    if(!cart.length){
        sidebarTotal.textContent = "₹0";
        return;
    }

    const total = cart.reduce((sum,item) => sum + item.price * item.quantity, 0);

    sidebarTotal.textContent = `₹${total.toFixed(2)}`;
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    renderCartSidebar();
}

function addEmptyCartButton() {
    const footer = document.querySelector('.cart-sidebar-footer');
    let existingBtn = document.getElementById('emptyCartBtn');
    if(!existingBtn){
        const btn = document.createElement("button");
        btn.id = "emptyCartBtn";
        btn.textContent = "Empty Cart";
        btn.classList.add("view-cart-btn");
        btn.style.marginTop = "10px";
        btn.addEventListener("click", () => {
            if(confirm("Are you sure you want to cleat the cart")){
                clearCart();
            }
        })
        footer.appendChild(btn);
    }
}

cartBtn.addEventListener("click", () => {
    renderCartSidebar();
    addEmptyCartButton();
})