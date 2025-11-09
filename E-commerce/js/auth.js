//DOM

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

if(loginForm){
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
    
        if(!email || !password){
            alert("Please fill in both email and password.");
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
    
        const loggedInUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
    
        if(loggedInUser){
            loginUser(loggedInUser);
            sessionStorage.setItem("showWelcome", "true");
            window.location.href = 'Home.html';
        } else {
            alert("invalid email or password ");
        }
    
        emailInput.value ='';
        passwordInput.value = '';
    
    });
}



function loginUser(userData){
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
}


function logoutUser(){
    localStorage.removeItem('loggedInUser');
    window.location.href = '../login.html';
}


function getLoggedInUser() {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
}


function checkPersistentLogin(){
    const user = getLoggedInUser();
    user ? console.log("User is logged in:", user.email) : console.log("No user session found"); 
}

checkPersistentLogin();

