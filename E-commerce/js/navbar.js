
const menuIcon = document.getElementById("menuIcon");
const dropdownMenu = document.getElementById("dropdownMenu");
const logoutBtn = document.getElementById("logoutBtn");
const usernameSpan = document.getElementById("username");


const user = JSON.parse(localStorage.getItem("loggedInUser"));


if (usernameSpan && user) {
  usernameSpan.textContent = user.username || user.email.split("@")[0];
}


if (menuIcon && dropdownMenu) {
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove("active");
    }
  });
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
}
