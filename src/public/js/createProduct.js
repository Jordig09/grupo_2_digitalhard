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

let subcategoryDiv = document.getElementById("subcategory-radio");

document.querySelectorAll("input[type='radio']").forEach((radio) => {
  radio.addEventListener("change", function () {
    let subcategory = document.createElement("div");
    subcategory.classList.add("category-radio");
    console.log(categories);
    categories[radio.value].subcategories.forEach((subcategory) => {
      subcategory.innerHTML = `
        <label class="category-label">
          <input
            type="radio"
            id=${subcategory.name}
            name="subcategories"
            value=${subcategory.id}
          />
          ${subcategory.name}
        </label>
      `;
      subcategoryDiv.append(subcategory);
    });
  });
});
