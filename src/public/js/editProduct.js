let images = document.getElementById("images");
let mainImage = document.getElementById("mainImage");

images.addEventListener("change", function (e) {
  let preview = document.getElementById("preview");

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

const imagesToDelete = [];
const specificationToDelete = [];
const specificationToUpdate = [];

mainImage.addEventListener("change", function (e) {
  let preview = document.getElementById("main-preview");

  let image = document.getElementById("product-image").src.split("/");
  imagesToDelete.push(image[image.length - 1]);
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

document.querySelectorAll(".image-container").forEach((img) => {
  img.addEventListener("click", function () {
    // Agrega la ruta de la imagen a la lista de imágenes a eliminar
    imagesToDelete.push(this.id);
    this.remove();
  });
});

let form = document.getElementById("edit-form");

form.addEventListener("submit", function (event) {
  // Justo antes de enviar el formulario, agrega los inputs ocultos
  imagesToDelete.forEach((imagePath) => {
    let input = document.createElement("input");
    input.type = "hidden";
    input.name = "deleteImages";
    input.value = imagePath;
    form.appendChild(input);
  });
  specificationToDelete.forEach((data) => {
    let input = document.createElement("input");
    input.type = "hidden";
    input.name = "deleteSpecifications";
    input.value = data;
    form.appendChild(input);
  });
  specificationToUpdate.forEach((data) => {
    let newDiv = document.createElement("input");
    newDiv.innerHTML = `
        <input type="hidden" name="idUpdate" value="${data.id}"/>
        <input type="hidden" name="nameUpdate-${data.id}" value="${data.name}"/>
        <input type="hidden" name="textUpdate-${data.id}" value="${data.text}"/> `;
    form.appendChild(newDiv);
  });
});

const arraySpecification = [];

const specificationsDiv = document.getElementById("specifications");
const specificationsBtn = document.getElementById("btn-add-specification");

specificationsBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addNewSpecification();
  renderSpecification();
});

function addNewSpecification() {
  arraySpecification.push({
    title: "",
    specification: [],
  });
}

function renderSpecification() {
  specificationsDiv.innerHTML = ``;
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
        data-index="${data.idTitle}"
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
    btnAddRow.classList.add("btn-add-row");
    btnAddRow.addEventListener("click", function (e) {
      e.preventDefault();
      const index = this.getAttribute("data-index");
      arraySpecification[index].specification.push({
        name: "",
        text: "",
      });
      renderRow(index);
    });
    const btnDeleteSpec = document.getElementById(`btn-delete-spec-${i + 1}`);
    btnDeleteSpec.classList.add("btn-delete-spec");
    btnDeleteSpec.addEventListener("click", (e) => {
      arraySpecification[i].specification.forEach((data) => {
        if (Number(data.id)) specificationToDelete.push(data.id);
      });
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
      <button type="button" class="btn-delete-row" id="btn-delete-row-${index}-${i}" data-index="${index}-${i}" index="${data?.id}">X</button>
    </div>`;
    subspecifications.append(newRow);
    const nameChange = document.getElementById(
      `specification-name-${index}-${i}`
    );
    const textChange = document.getElementById(
      `specification-text-${index}-${i}`
    );
    nameChange.addEventListener("change", (e) => {
      if (data.id) {
        let findSpec = specificationToUpdate.findIndex(
          (spec) => spec.id == data.id
        );
        findSpec == -1
          ? specificationToUpdate.push({
              id: data.id,
              name: e.target.value,
              text: textChange.value,
            })
          : (specificationToUpdate[findSpec].name = e.target.value);
      }
      arraySpecification[index].specification[i].name = e.target.value;
    });
    textChange.addEventListener("change", (e) => {
      if (data.id) {
        let findSpec = specificationToUpdate.findIndex(
          (spec) => spec.id == data.id
        );
        findSpec == -1
          ? specificationToUpdate.push({
              id: data.id,
              name: nameChange.value,
              text: e.target.value,
            })
          : (specificationToUpdate[findSpec].text = e.target.value);
      }
      arraySpecification[index].specification[i].text = e.target.value;
    });
    const btnDeleteRow = document.getElementById(
      `btn-delete-row-${index}-${i}`
    );
    btnDeleteRow.addEventListener("click", (e) => {
      e.preventDefault();
      const index = btnDeleteRow.getAttribute("data-index").split("-");
      arraySpecification[index[0]].specification.splice(index[1], 1);
      if (Number(btnDeleteRow.getAttribute("index")))
        specificationToDelete.push(btnDeleteRow.getAttribute("index"));
      renderRow(index[0]);
    });
  });
}

for (let i = 0; i <= specificationsDiv.childElementCount - 1; i++) {
  let idTitle = document
    .getElementById(`specification-title-${i + 1}`)
    .getAttribute("data-index");
  arraySpecification.push({
    title: document.getElementById(`specification-title-${i + 1}`).value,
    specification: [],
    idTitle,
  });
  for (
    let j = 0;
    j < document.getElementsByName(`specification-name-${i}`).length;
    j++
  ) {
    arraySpecification[i].specification.push({
      id: document
        .getElementById(`btn-delete-row-${i}-${j}`)
        .getAttribute("index"),
      name: document.getElementById(`specification-name-${i}-${j}`).value,
      text: document.getElementById(`specification-text-${i}-${j}`).value,
    });
  }
}

renderSpecification();
