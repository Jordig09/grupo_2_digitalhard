const iconBars = document.querySelector("#icon-bars");
const closeSearch = document.querySelector("#close-search");
const searchActive = document.querySelector("#search-active");
const userDropdown = document.querySelector("#user-dropdown");
const productDropdown = document.querySelector("#product-dropdown");
const userDropdownArrow = document.querySelector("#user-dropdown-arrow");

iconBars.addEventListener("click", () => {
  document.getElementById("navbar").classList.toggle("burguer-activate");
});

closeSearch.addEventListener("click", () => {
  document.getElementById("box-search").classList.toggle("search-active");
});

document.getElementById("search-active").addEventListener("click", () => {
  document.getElementById("box-search").classList.toggle("search-active");
});

document.getElementById("user-dropdown").addEventListener("click", () => {
  document
    .getElementById("client-dropdown")
    .classList.toggle("client-dropdown-active");
  userDropdownArrow.classList.toggle("close-dropdown");
});

document.getElementById("product-dropdown").addEventListener("click", () => {
  document
    .getElementById("categoty-dropdown")
    .classList.toggle("product-dropdown-active");
});
