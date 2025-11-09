//!!!Destructuring allows you to unpack values from arrays or objects into separate variables easily.
//You save time and make code cleaner — especially when working with many properties (like our product objects in eCommerce).
//You can also rename while destructuring:
const product = { name: "shirt", price: 499 }
const { name:productName , price:productPrice } = product;
console.log(productName);
console.log(productPrice);



// !!!Spread (...) expands arrays or objects — allowing you to copy or merge easily(D)
//// adds without modifying original
const cart = JSON.parse(localStorage.getItem("cart")) || []
const newCart = [...cart, "watch"]
console.log(cart);
console.log(newCart);
//modify
const newProduct1 = {...product, price:999}
console.log(newProduct1)
const newProduct2 = {...product,id:1};
console.log(newProduct2);
//This copies all product properties and adds a new one (quantity).
cart.push({...product, quantitiy: 1 });
console.log(cart);
//Merge
const mergeCart = [...cart,...newCart]
console.log(mergeCart);

// !!!Array Methods: map(), filter(), reduce()
// These are the core of modern JavaScript — every developer uses them daily.
//map()
//transforms-loops over an array and return new array
// array.map((currentValue, index, array) => {
//     return something
//   })
const prices = [100,200,300];
const newPrices = prices.map((price) => price*1.18)//d
console.log(newPrices)

//filter Returns a new array with only elements that pass a condition.
// array.filter((currentValue, index, array) => condition)

const expensive = prices.filter((item) => item > 150)//d
console.log(expensive)

//reduce() reduces array to a single value (sum, total, etc.)
// array.reduce((accumulator, currentValue, index, array) => {
//     combine and return new accumulator value
//   }, initialValue)
  
const total = prices.reduce((sum,p) => sum + p, 0);//d
console.log(total);

// .some() checks if at least one element in an array meets a condition.
// It returns true if any one matches.
// It stops checking once it finds a match (for speed).

Example:

const users = [{email: "a@mail.com"}, {email: "b@mail.com"}];
const exists = users.some(u => u.email === "a@mail.com");
console.log(exists);


//!!!!!A closure is when a function remembers the variables from the place it was created, even after that scope is gone
// A closure happens when an inner function remembers variables from its outer function,
// even after the outer function has finished running.

function makeCounter() {
    let count = 0;
    return function() { //d
        count ++;
        console.log(count);
    };
}
const counter = makeCounter();
counter();
counter();

//!!!!localStorage
localStorage.setItem("cart",JSON.stringify(cart));
//localStorage.removeItem("cart");

//!!!Delegation
// Instead of adding click listeners to every button, you attach one listener to a common parent and check which child was clicked.
const addToCartDiv = document.querySelector('.add-to-cart-div')
addToCartDiv.addEventListener("click",(e) => {
    if(e.target.classList.contains("add-to-cart")){
        console.log("Add to Cart clicked");
    }
});

// !!!Default Parameters
// When you define a function, you can give default values so the code doesn’t break if an argument isn’t passed.
function addTOCart(product, quantitiy = 1){
    console.log(product, quantitiy);
}
addTOCart("pizza",2);
addTOCart("pizza");

//!!!!8️⃣ Optional Chaining (?.)
// Helps you access nested properties safely — without crashing if something doesn’t exist.
const user = {profile:{name:"Yahya"}};
console.log(user.profile?.name);
console.log(user.profile?.city);// undefined (no error)

//9️⃣ Ternary Operator
// A shorter version of an if-else condition.
let stock = 0;
let message = stock > 0?"in stock":"out of stock";
console.log(message);

//🔟 Short-Circuit Evaluation
// Uses logical operators (|| or &&) to assign fallback values.
let username = "";
let displayname = username || "Guest";
console.log(username);
