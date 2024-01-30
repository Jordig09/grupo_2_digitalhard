const formulario =
  document.querySelector("#form") || document.querySelector("#edit-form");

formulario.addEventListener("submit", function (e) {
  const errores = {};

  const inputName = document.getElementById("name");
  const erName = document.getElementById("erName");

  const inputBrand = document.getElementById("brand");
  const erBrand = document.getElementById("erBrand");

  const inputPrice = document.getElementById("price");
  const erPrice = document.getElementById("erPrice");

  const inputDiscount = document.getElementById("discount");
  const erDiscount = document.getElementById("erDiscount");

  const erCategory = document.getElementById("erCategory");

  const inputStock = document.getElementById("stock");
  const erStock = document.getElementById("erStock");

  const erSpecification = document.getElementById("erSpecification");

  if (inputName.value.trim().length < 1) {
    errores.name = "Este campo debe estar completo";
  }
  if (Number(inputBrand.value) == 0) {
    errores.brand = "Debes selecionar una opcion";
  }
  if (
    !inputPrice.value ||
    Number(inputPrice.value) == NaN ||
    Number(inputPrice.value) < 0
  ) {
    errores.price = "El valor debe ser mayor o igual a 0";
  }
  if (
    !inputStock.value ||
    Number(inputStock.value) == NaN ||
    Number(inputStock.value) < 0
  ) {
    errores.stock = "El valor debe ser mayor o igual a 0";
  }
  if (
    !inputDiscount.value ||
    Number(inputDiscount.value) == NaN ||
    Number(inputDiscount.value) < 0 ||
    Number(inputDiscount.value) > 100
  ) {
    errores.discount = "El valor debe estar contenido entre 0 y 100";
  }
  let checked = false;
  document.getElementsByName("subcategory").forEach((data) => {
    if (data.checked) checked = true;
  });
  if (!checked) errores.category = "Debes seleccionar una categoria";

  let errorSpec = "";
  let i = 0;
  while (errorSpec == "" && i < arraySpecification.length) {
    let messageError =
      "Debes completar todos los campos. \nCada especificacion debe contener al menos una fila";
    if (arraySpecification[i].title == "") errorSpec = messageError;
    if (arraySpecification[i].specification.length == 0)
      errorSpec = messageError;
    arraySpecification[i].specification.forEach((data) => {
      if (data.name.trim() == "" || data.text.trim() == "") {
        errorSpec = messageError;
      }
    });
    i++;
  }
  if (errorSpec != "") errores.specification = errorSpec;

  if (Object.keys(errores).length >= 1) {
    e.preventDefault();
    erName.innerText = errores.name ? errores.name : "";
    erBrand.innerText = errores.brand ? errores.brand : "";
    erPrice.innerText = errores.price ? errores.price : "";
    erStock.innerText = errores.stock ? errores.stock : "";
    erDiscount.innerText = errores.discount ? errores.discount : "";
    erCategory.innerText = errores.category ? errores.category : "";
    erSpecification.innerText = errores.specification
      ? errores.specification
      : "";
    console.log(errores);
  }
});
