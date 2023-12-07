let images = document.getElementById("images");

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

const arraySpecification = [];
// const titleSpecifications = [];

function renderSpecification() {
  let specificationDiv = document.getElementById("specification");
  specificationDiv.innerHTML = `<h4>Especificaciones</h4>
    <button type="button" id="btn-add-specification" onclick="addNewSpecification()">+</button>`;

  for (let i = 0; i < arraySpecification.length; i++) {
    specificationDiv.innerHTML += `<div class="table-container">
    <div class="input-container">
      <label for="titleSpecification">Titulo</label>
      <input type="text" name="titleSpecification" value="${arraySpecification[i].title}" id="title-${i}" />
      <button type="button" id="btn-add-row-${i}">Add Row</button>
    </div>
    <table id="table-${i}">
      <tr>
        <th>Característica</th>
        <th>Valor</th>
      </tr>
    </table>
  </div>`;
    for (let j = 0; j < arraySpecification[i].specification.length; j++) {
      document.getElementById(`table-${i}`).innerHTML += `
      <tr>
          <td>
            <div class="input-container">
              <input type="text" name="${arraySpecification[i].title}" value="${arraySpecification[i].specification[j].name}" />
            </div>
          </td>
          <td>
            <div class="input-container">
              <input type="text" name="${arraySpecification[i].title}" value="${arraySpecification[i].specification[j].text}" />
            </div>
          </td>
          <td>
            <button type="button" id="btn-delete-row-${i}-${j}">X</button>
          </td>
        </tr>`;
    }
  }
  for (let i = 0; i < arraySpecification.length; i++) {
    document.getElementById(`title-${i}`).addEventListener("change", (e) => {
      arraySpecification[i].title = e.target.value;
      renderSpecification();
    });
    document
      .getElementById(`btn-add-row-${i}`)
      .addEventListener("click", (e) => {
        arraySpecification[i].specification.push({
          name: "",
          text: "",
        });
        renderSpecification();
      });
    for (let j = 0; j < arraySpecification[i].specification.length; j++) {
      document
        .getElementById(`btn-delete-row-${i}-${j}`)
        .addEventListener("click", (e) => {
          arraySpecification[i].specification.splice(j, 1);
          renderSpecification();
        });
    }
  }
}

function addNewSpecification() {
  arraySpecification.push({
    title: "",
    specification: [],
  });
  renderSpecification();
}
