let images = document.getElementById("images");

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

let imagesToDelete = [];

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
});
