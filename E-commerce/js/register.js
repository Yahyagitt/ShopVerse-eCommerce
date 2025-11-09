
const registerForm = document.getElementById('registerForm')


if(registerForm){
    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();
    
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
    
        
        if(!username || !email || !password || !confirmPassword){
            alert("Please fill in all fields before continuing.");
            return;
        }
    
        if(password !== confirmPassword){
            alert("Passwords dont match! Try again");
            return;
        }
    
        
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
        
        const userExists = existingUsers.some(user => user.email === email);
        if(userExists){
            alert("An account with this email already exists");
            return;
        }
    
        
        const newUser = {
            username,
            email,
            password
        };
    
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        
        
        alert("Registration successful Redirecting to login...");
    
        
        window.location.href = "index.html";
    
    });
}




