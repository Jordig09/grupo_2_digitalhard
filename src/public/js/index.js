document.getElementById("icon-bars").addEventListener("click", () => {
  document.getElementById("navbar").classList.toggle("burguer-activate");
});

document.getElementById("close-search").addEventListener("click", () => {
  document.getElementById("box-search").classList.toggle("search-active");
});

document.getElementById("search-active").addEventListener("click", () => {
  document.getElementById("box-search").classList.toggle("search-active");
});

document.getElementById("user-dropdown").addEventListener("click", () => {
  document
    .getElementById("client-dropdown")
    .classList.toggle("client-dropdown-active");
});

document.getElementById("product-dropdown").addEventListener("click", () => {
  document
    .getElementById("categoty-dropdown")
    .classList.toggle("product-dropdown-active");
});
