document.getElementById("button-specs-toggle").addEventListener("click", () => {
  document
    .getElementById("table-content")
    .classList.toggle("table-content-active");
});
const imagesElements = document.querySelectorAll(".other-images img");
const imgMain = document.getElementById("main-image");

imagesElements.forEach((img) => {
  img.addEventListener("click", (event) => {
    imgMain.src = img.src;
  });
});

const btnMinus = document.getElementById("btn-minus");
const btnPlus = document.getElementById("btn-plus");
const quantity = document.getElementById("quantity-value");
const stock = document.getElementById("stock");

btnMinus.addEventListener("click", (e) => {
  if (Number(quantity.value) > 1) {
    quantity.value = Number(quantity.value) - 1;
  }
});
btnPlus.addEventListener("click", (e) => {
  if (
    Number(stock.value) != NaN &&
    Number(quantity.value) < Number(stock.value)
  ) {
    quantity.value = Number(quantity.value) + 1;
  }
});

const btnAddToCart = document.getElementById("add-cart");
const btnBuyNow = document.getElementById("buy-now");

btnAddToCart.addEventListener("click", async (e) => {
  const data = btnAddToCart.getAttribute("data");
  postProduct(data);
});
btnBuyNow.addEventListener("click", async (e) => {
  const data = btnAddToCart.getAttribute("data");
  postProduct(data);
  location.href = "/cart";
});

async function postProduct(products_id) {
  await fetch("/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      products_id: Number(products_id),
      quantity: Number(quantity.value),
    })
  }).then(res => {
    if(res.redirected) location.href = "/user/login";
  })
}
