

window.addEventListener("load", () => {
  const publicPages = ["index.html", "register.html"];
  const currentPage = window.location.pathname.split("/").pop();


  if (publicPages.includes(currentPage)) return;

  const user = getLoggedInUser?.(); 
  if (!user) {
    alert("Please log in first to access this page.");
    window.location.href = "index.html";
  } else {
    console.log(`Access granted to: ${user.email}`);
  }
});
