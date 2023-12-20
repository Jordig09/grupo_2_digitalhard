/* Preview de imagenes */
let images = document.getElementById("images");
let mainImage = document.getElementById("mainImage");

images.addEventListener("change", (e) => {
  imagePreview("preview", e);
});

mainImage.addEventListener("change", (e) => {
  imagePreview("main-preview", e);
});

function imagePreview(id, e) {
  let preview = document.getElementById(id);
  preview.innerHTML = "";

  Array.from(e.target.files).forEach((file) => {
    let img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.classList.add("preview-img");
    img.onload = function () {
      URL.revokeObjectURL(img.src);
    };
    preview.appendChild(img);
  });
}

/* Creación de nuevas especificaciones */

const arraySpecification = [];

const specificationsDiv = document.getElementById("specifications");
const specificationsBtn = document.getElementById("btn-add-specification");

specificationsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addNewSpecification();
  const newSpecification = document.createElement("div");
  newSpecification.innerHTML = `
  <div class="input-container specification-container">
    <label for="specification-title-${arraySpecification.length}">Título</label>
    <input
      type="text"
      id="specification-title-${arraySpecification.length}"
      name="specification-title-${arraySpecification.length}"
    />
    <div id="subspecifications${arraySpecification.length - 1}"></div>
    <button
      type="button"
      id="btn-add-row-${arraySpecification.length}"
      data-index="${arraySpecification.length - 1}"
    >
    Añadir nueva fila
    </button>
  </div>`;
  specificationsDiv.append(newSpecification);

  const btnAddRow = document.getElementById(
    `btn-add-row-${arraySpecification.length}`
  );
  const subspecifications = document.getElementById(
    `subspecifications${arraySpecification.length - 1}`
  );
  btnAddRow.addEventListener("click", function (e) {
    e.preventDefault;
    const index = this.getAttribute("data-index");
    arraySpecification[index].specification.push({
      name: "",
      text: "",
    });
    const newRow = document.createElement("div");
    newRow.id = `row-${index}`;
    newRow.innerHTML = `<div class="input-group">
      <div class="input-container">
        <label for="specification-name-${index}">Nombre</label>
        <input
          type="text"
          id="specification-name-${index}"
          name="specification-name-${index}"
          value="${arraySpecification[index].specification.name}"
        />
      </div>
      <div class="input-container">
        <label for="specification-text-${index}">Valor</label>
        <input
          type="text"
          id="specification-text-${index}"
          name="specification-text-${index}"
          value="${
            arraySpecification[index].specification[
              arraySpecification[index].specification.length - 1
            ].text
          }"
        />
      </div>
      <button type="button" id="btn-delete-row-${index}" data-index="${index}">X</button>
    </div>`;
    subspecifications.append(newRow);
  });
});

function addNewSpecification() {
  arraySpecification.push({
    title: "",
    specification: [],
  });
}

/* Busqueda de categorías */
const categorySearchInput = document.querySelector("#category-search");
const categoriesDiv = document.querySelector("#categories");

categorySearchInput.addEventListener("input", (e) => {
  let searchValue = e.target.value;

  fetch(`/search?q=${searchValue}`)
    .then((response) => response.json())
    .then((categories) => {
      categoriesDiv.innerHTML = "";
      categories.forEach((category) => {
        let p = document.createElement("p");
        p.innerText = category.name;
        categoriesDiv.append(p);
        category.subcategories.forEach((subcategory) => {
          let input = document.createElement("label");
          input.classList.add("category-label");
          input.innerHTML = `
            <input
              type="radio"
              id="${subcategory.name}"
              name="subcategory"
              value="${subcategory.id}"
            />
            ${subcategory.name}`;
          categoriesDiv.append(input);
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
