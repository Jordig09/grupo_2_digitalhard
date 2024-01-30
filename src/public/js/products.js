const sidebarDropdownArrows = document.querySelectorAll(
  ".sidebar-dropdown-arrow"
);

sidebarDropdownArrows.forEach((dropdownArrow) => {
  dropdownArrow.addEventListener("click", () => {
    dropdownArrow.classList.toggle("close-dropdown");
    const dropdownParent = dropdownArrow.parentElement.parentElement;
    const dropdownContainer = dropdownParent.lastElementChild;
    dropdownContainer.classList.toggle("hide-dropdown");
  });
});