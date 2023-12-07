let images = document.getElementById("images");
let mainImage = document.getElementById("mainImage");

images.addEventListener("change", function (e) {
  let preview = document.getElementById("preview");
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
});

mainImage.addEventListener("change", function (e) {
  let preview = document.getElementById("main-preview");
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
});

const arraySpecification = [];

const specificationsDiv = document.getElementById("specifications");
const specificationsBtn = document.getElementById("btn-add-specification");

specificationsBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addNewSpecification();
  const newSpecification = document.createElement("div");
  newSpecification.innerHTML = `
  <div class="input-container">
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
    newRow.innerHTML = `<div class="input-group">
      <div class="input-container">
        <label for="specification-name-${arraySpecification[index].specification.length}">Nombre</label>
        <input
          type="text"
          id="specification-name-${arraySpecification[index].specification.length}"
          name="specification-name-${arraySpecification[index].specification.length}"
        />
      </div>
      <div class="input-container">
        <label for="specification-text-${arraySpecification[index].specification.length}">Valor</label>
        <input
          type="text"
          id="specification-text-${arraySpecification[index].specification.length}"
          name="specification-text-${arraySpecification[index].specification.length}"
        />
      </div>
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
