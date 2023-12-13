const sidebarDropdownArrows = document.querySelectorAll(
  ".sidebar-dropdown-arrow"
);

sidebarDropdownArrows.forEach((dropdownArrow) => {
  dropdownArrow.addEventListener("click", () => {
    dropdownArrow.classList.toggle("close-dropdown");
    const dropdownParent = dropdownArrow.parentElement.parentElement;
    console.log(dropdownParent);
    const dropdownContainer = dropdownParent.lastElementChild;
    console.log(dropdownContainer);
    dropdownContainer.classList.toggle("hide-dropdown");
  });
});
