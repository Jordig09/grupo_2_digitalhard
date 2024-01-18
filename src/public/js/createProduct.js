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

specificationsBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addNewSpecification();
  specificationsDiv.innerHTML = ``;
  renderSpecification();
});

function addNewSpecification() {
  arraySpecification.push({
    title: "",
    specification: [],
  });
}

function renderSpecification() {
  arraySpecification.forEach((data, i) => {
    const newSpecification = document.createElement("div");
    newSpecification.innerHTML = `
    <div class="input-container">
      <label for="specification-title">Título</label>
      <input
        type="text"
        id="specification-title-${i + 1}"
        name="specification-title"
        value="${data?.title}"
      />
      <div id="subspecifications${i}"></div>
      <button
        type="button"
        id="btn-add-row-${i + 1}"
        data-index="${i}"
      >
      Añadir nueva fila
      </button>
      <button
        type="button"
        id="btn-delete-spec-${i + 1}"
        data-index="${i}"
      >
      Borrar especificacion
      </button>
    </div>`;
    specificationsDiv.append(newSpecification);
    document
      .getElementById(`specification-title-${i + 1}`)
      .addEventListener("change", (e) => {
        arraySpecification[i].title = e.target.value;
      });
    renderRow(i);
    const btnAddRow = document.getElementById(`btn-add-row-${i + 1}`);
    btnAddRow.addEventListener("click", function (e) {
      e.preventDefault();
      const index = this.getAttribute("data-index");
      arraySpecification[index].specification.push({
        name: "",
        text: "",
      });
      renderRow(index);
    });
    document
      .getElementById(`btn-delete-spec-${i + 1}`)
      .addEventListener("click", (e) => {
        arraySpecification.splice(i, 1);
        specificationsDiv.innerHTML = ``;
        renderSpecification();
      });
  });
}

function renderRow(index) {
  const subspecifications = document.getElementById(
    `subspecifications${index}`
  );
  subspecifications.innerHTML = ``;
  arraySpecification[index].specification.forEach((data, i) => {
    const newRow = document.createElement("div");
    newRow.id = `row-${index}-${i}`;
    newRow.innerHTML = `<div class="input-group">
      <div class="input-container">
        <label for="specification-name-${index}">Nombre</label>
        <input
          type="text"
          id="specification-name-${index}-${i}"
          name="specification-name-${index}"
          value="${data?.name}"
        />
      </div>
      <div class="input-container">
        <label for="specification-text-${index}">Valor</label>
        <input
          type="text"
          id="specification-text-${index}-${i}"
          name="specification-text-${index}"
          value="${data?.text}"
        />
      </div>
      <button type="button" id="btn-delete-row-${index}-${i}" data-index="${index}-${i}">X</button>
    </div>`;
    subspecifications.append(newRow);
    document
      .getElementById(`specification-name-${index}-${i}`)
      .addEventListener("change", (e) => {
        arraySpecification[index].specification[i].name = e.target.value;
      });
    document
      .getElementById(`specification-text-${index}-${i}`)
      .addEventListener("change", (e) => {
        arraySpecification[index].specification[i].text = e.target.value;
      });
    const btnDeleteRow = document.getElementById(
      `btn-delete-row-${index}-${i}`
    );
    btnDeleteRow.addEventListener("click", (e) => {
      e.preventDefault();
      const index = btnDeleteRow.getAttribute("data-index").split("-");
      arraySpecification[index[0]].specification.splice(index[1], 1);
      renderRow(index[0]);
    });
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
