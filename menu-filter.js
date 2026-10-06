const categorySelect = document.getElementById("menu-category-select");
const menuContent = document.querySelector(".menu-content");

if (categorySelect && menuContent) {
  const menuSections = menuContent.querySelectorAll(":scope > section");

  categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;

    menuSections.forEach((section) => {
      section.hidden = selectedCategory !== "all" && section.id !== selectedCategory;
    });

  });
}
