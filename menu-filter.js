const categoryPicker = document.getElementById("menu-category-picker");
const menuContent = document.querySelector(".menu-content");

if (categoryPicker && menuContent) {
  const categoryButton = categoryPicker.querySelector(".menu-category-select");
  const selectedLabel = categoryPicker.querySelector(".menu-category-selected");
  const optionsList = categoryPicker.querySelector(".menu-category-options");
  const options = Array.from(categoryPicker.querySelectorAll(".menu-category-option"));
  const menuSections = menuContent.querySelectorAll(":scope > section");

  if (categoryButton && selectedLabel && optionsList && options.length > 0) {
    function setOptionsOpen(isOpen, focusSelected = false) {
      categoryButton.setAttribute("aria-expanded", String(isOpen));
      optionsList.setAttribute("aria-hidden", String(!isOpen));
      categoryPicker.classList.toggle("is-open", isOpen);

      if (isOpen && focusSelected) {
        options.find((option) => option.getAttribute("aria-selected") === "true")?.focus();
      }
    }

    function selectCategory(option) {
      const selectedCategory = option.dataset.value;

      if (!selectedCategory) {
        return;
      }

      selectedLabel.textContent = option.textContent;
      options.forEach((item) => {
        item.setAttribute("aria-selected", String(item === option));
      });
      menuSections.forEach((section) => {
        section.hidden = selectedCategory !== "all" && section.id !== selectedCategory;
      });

      setOptionsOpen(false);
      categoryButton.focus();
    }

    categoryButton.addEventListener("click", () => {
      const isOpen = categoryButton.getAttribute("aria-expanded") === "true";
      setOptionsOpen(!isOpen);
    });

    optionsList.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const option = event.target.closest(".menu-category-option");
      if (option && optionsList.contains(option)) {
        selectCategory(option);
      }
    });

    document.addEventListener("pointerdown", (event) => {
      if (event.target instanceof Node && !categoryPicker.contains(event.target)) {
        setOptionsOpen(false);
      }
    });

    categoryPicker.addEventListener("focusout", (event) => {
      if (!categoryPicker.contains(event.relatedTarget)) {
        setOptionsOpen(false);
      }
    });
  }
}
