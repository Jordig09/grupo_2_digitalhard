let select = document.getElementById("attributes");
let simpleProduct = document.getElementById("simple-product-form");
let variableProduct = document.getElementById("variable-product-form");

select.addEventListener("change", function () {
  simpleProduct.classList.toggle("attributes-active");
  variableProduct.classList.toggle("attributes-active");
});

let newAttribute = document.getElementById("new-attribute");
let attributeVariant = document.getElementById("attribute-variant");
let attributeSubmit = document.getElementById("attribute-submit");

attributeSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  let variantQuantity = attributeVariant.value;
  let variant = document.createElement("div");
  variant.classList.add("variant");
  let variantType = newAttribute.value;
  variant.innerHTML = "<h4>" + variantType + "</h4>";
  for (let i = 0; i < variantQuantity; i++) {
    let newVariant = document.createElement("div");
    newVariant.classList.add("variable-attributes");
    newVariant.innerHTML = `
      <div class="input-container">
        <label for="new-attribute${i}">Valor Atributo (${variantType} ${i})</label>
        <input
          type="text"
          name="new-attribute${i}"
          id="new-attribute${i}"
          class="new-attribute"
        />
      </div>
      <div class="input-container">
        <label for="new-attribute${i}-stock">Stock</label>
        <input
          type="number"
          name="new-attribute${i}-stock"
          id="new-attribute${i}-stock"
          min=0
          class="new-attribute"
        />
      </div>
    </div>`;
    variant.append(newVariant);
  }
  variableProduct.append(variant);
});
