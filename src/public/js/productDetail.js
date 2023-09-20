const imagesElements = document.querySelectorAll('.other-images img');
const imgMain = document.getElementById('main-image');

imagesElements.forEach((img) => {
    img.addEventListener('click', (event) => {
        imgMain.src = img.src;
    });
});

const btnAdd = document.getElementById('btn-add');
const quantityElement = document.getElementById('quantity-value');
const iconCartShopping = document.getElementById('icon-cart-shopping');

btnAdd.addEventListener('click', (event) => {
    iconCartShopping.dataset.product_quantity = parseInt(iconCartShopping.dataset.product_quantity) + parseInt(quantityElement.dataset.quantity);
});

const btnPlus = document.getElementById('btn-plus');
const btnMinus = document.getElementById('btn-minus');

[btnPlus, btnMinus].forEach(btn => {
    btn.addEventListener('click', (event) => {
        let result;
        
        if (event.currentTarget.id == 'btn-minus') {
            result = parseInt(quantityElement.dataset.quantity) - 1;
        } else {
            result = parseInt(quantityElement.dataset.quantity) + 1;
        }
        
        if (result < 0) {
            return;
        }

        quantityElement.textContent = result;
        quantityElement.dataset.quantity = result;
    });
});