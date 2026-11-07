const categoryPicker = document.getElementById("menu-category-picker");
const menuContent = document.querySelector(".menu-content");

// Sets up category filtering only when both parts of the menu are present.
if (categoryPicker && menuContent) {
  const categoryButton = categoryPicker.querySelector(".menu-category-select");
  const selectedLabel = categoryPicker.querySelector(".menu-category-selected");
  const optionsList = categoryPicker.querySelector(".menu-category-options");
  const options = categoryPicker.querySelectorAll(".menu-category-option");
  const menuSections = menuContent.querySelectorAll(":scope > section");

  // Enables filtering only when the picker has all required controls and options.
  if (categoryButton && selectedLabel && optionsList && options.length > 0) {
    // Keeps the picker's visual state and accessibility attributes in sync.
    function setOptionsOpen(isOpen) {
      categoryButton.setAttribute("aria-expanded", String(isOpen));
      optionsList.setAttribute("aria-hidden", String(!isOpen));
      categoryPicker.classList.toggle("is-open", isOpen);
    }

    // Updates the selected option and show only its matching menu section.
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

    // Toggles the options list when the picker button is clicked.
    categoryButton.addEventListener("click", () => {
      const isOpen = categoryButton.getAttribute("aria-expanded") === "true";
      setOptionsOpen(!isOpen);
    });

    // Selects an option when it, or one of its child elements, is clicked.
    optionsList.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const option = event.target.closest(".menu-category-option");
      if (option && optionsList.contains(option)) {
        selectCategory(option);
      }
    });

    // Closes the options list when the user clicks outside the picker.
    document.addEventListener("pointerdown", (event) => {
      if (event.target instanceof Node && !categoryPicker.contains(event.target)) {
        setOptionsOpen(false);
      }
    });

    // Closes the options list when keyboard focus leaves the picker.
    categoryPicker.addEventListener("focusout", (event) => {
      if (!categoryPicker.contains(event.relatedTarget)) {
        setOptionsOpen(false);
      }
    });
  }
}

// Adds descriptions and a consistent details layout to regular menu item tiles.
if (menuContent) {
  // Provide descriptions for known items; use a placeholder for other items.
  const itemDescriptions = {
    "Beef Mami": "A dish consisting of salt-cured brisket of beef and noodles.",
    "Beef Wonton": "A popular Filipino-Chinese comfort food featuring chewy egg noodles, tender beef brisket, and boiled beef wontons in a rich, garlicky beef bone broth.",
    "Wonton Mami": "For Reference: A comforting noodle soup featuring wontons and savory broth, ideal for a warm, satisfying meal.",
    "Chicken Mami": "For reference only: Comforting Filipino noodle soup with savory chicken and flavorful broth.",
    "Chicken Wonton": "Delicate bite-sized Chinese dumplings made with thin wheat flour wrappers folded around savory ground chicken filling. Seasoned with ginger garlic and soy sauce, these versatile wontons can be served boiled steamed or deep-fried.",
    "Baked Macaroni": "For reference: Savor the comforting and cheesy flavors of Baked Macaroni, featuring tender macaroni pasta baked with creamy cheese sauce.",
    "Pancit Palabok": "For reference only: Experience the savory delight of Pancit Palabok. A flavorful medley of noodles, sauce, and toppings.",
    "Lumpia": "For reference only: Lumpia is typically made from a combo of pork, vegetables, and aromatics.",
    "Lechon Paksiw": "For reference only: Succulent and tender roasted pork cooked in a tangy and savory sauce for a Filipino favorite.",
    "Beef Spaghetti": "For reference only: Succulent and tender roasted pork cooked in a tangy and savory sauce for a Filipino favorite.",
    "Pancit Palabok Bilao 300": "TBA",
    "Pancit Palabok Bilao 600": "TBA",
    "Bilao Beef Spaghetti": "For reference only: Satisfy your pasta cravings with this delicious Beef Spaghetti!",
    "Spaghetti": "For reference only: Satisfy your pasta cravings with this delicious Spaghetti!",
    "Pancit Bihon": "The perfect combination of your choice of hot and fresh waffle with a spread of chocolate, topped with banana slices.",
    "Chicken Sandwich": "A sandwich that typically consists of boneless chicken breast or thigh served between slices of bread.",
    "Ham & Egg": "For reference only: Ham & egg, a simple and classic combination of savory ham and a perfectly cooked egg.",
    "Club House": "For reference only: A timeless favorite filled with layers of savory goodness.",
    "Hamburger": "For reference: Sink your teeth into the juicy goodness of a classic Hamburger.",
    "Bilao Pancit Palabok 300": "Good for 3-4 persons.",
    "Bilao Pancit Palabok 400": "Good for 4-5 persons.",
    "Bilao Pancit Palabok 500": "Good for 5-6 persons.",
    "Bilao Pancit Palabok 600": "Good for 6-7 persons.",
    "Barbeque": "Classic, savory-sweet Filipino pork barbecue.",
    "Kare-Kare": "A surprisingly flavorful, rich peanut sauce that carries excellent depth even on its own.",
    "Chicken BBQ": "A mouthwatering taste of summer with a balance of sweetness and tanginess",
    "Plain Rice Platter (Small)": "Steamed Rice",
    "Bilao Pork Spaghetti": "For reference: A flavorful blend of spaghetti and traditional Filipino noodles served in a large platter.",
    "Bilao Sotanghon Guisado": "For reference: Stir-fried glass noodles with vegetables, shrimp, and chicken served in a traditional round platter.",
    "Bilao Bihon Guisado": "For reference: Stir-fried rice noodles with vegetables, shrimp, and savory sauce served in a large platter.",
    "Leche Flan Llanera": "For reference: Creamy caramel custard dessert, rich in flavor and smooth in texture, often enjoyed chilled.",
    "Broken Glass Gelatin": "For reference: Colorful gelatin layers create a visually stunning and refreshing dessert, perfect for any occasion.",
    "Leche Flan": "A creamy and rich dessert made from egg yolks and milk topped with sweet caramel syrup",
    "Macaroni Salad": "For reference only: Experience the taste of tradition with our Macaroni Salad, a beloved classic that never goes out of style.",
    "Fruit Salad": "For reference only: Experience a medley of vibrant fruits dancing together in perfect harmony.",
    "Garlic Bread": "Toasted bread infused with garlic and butter, served as a savory side or appetizer.",
    "Buko Juice": "For reference only: Quench your thirst with the tropical goodness of this Buko Juice, a refreshing coconut water drink!",
    "Gulaman": "For reference only: A refreshing Filipino dessert drink made with sweetened gelatin cubes, often served with a sugary syrup and ice.",
    "Nestea": "For reference: A refreshing and classic iced tea blend with a sweet and tangy flavor, perfect for cooling off.",
    "Coke Regular": "For reference only: Experience the original taste of Coke. Perfect match for every meal",
    "Coke In Can": "Experience the original taste of Coke. Perfect match for every meal.",
    "Coke Zero In Can": "For reference only: Perfect for those who want to enjoy the classic Coke taste without the added sugar.",
  };
  
  // Skips the popular-items section, which has its own presentation.
  const menuListSections = Array.from(menuContent.children).filter(
    (section) => section.id !== "popular"
  );

  // Marks each regular section for list styling and reorganize its item tiles.
  menuListSections.forEach((section) => {
    section.classList.add("menu-list-section");

    section.querySelectorAll(".menu-item-tile").forEach((tile) => {
      // Reads the item name and image needed to build its details layout.
      const nameHeading = tile.querySelector(".menu-item-name");
      const image = tile.querySelector(".menu-item-image");
      const name = nameHeading?.textContent?.trim();

      if (!nameHeading || !image || !name) {
        return;
      }

      // Preserves the name cell and replace its contents with styled name elements.
      const nameCell = nameHeading.closest(".menu-item-name-cell");
      if (!nameCell) {
        return;
      }

      const nameLabel = document.createElement("span");
      nameLabel.className = "menu-item-name-label";
      nameLabel.textContent = name;

      const leader = document.createElement("span");
      leader.className = "menu-item-name-leader";
      leader.setAttribute("aria-hidden", "true");
      nameHeading.replaceChildren(nameLabel, leader);

      // Moves the image into a details panel alongside the item description.
      const details = document.createElement("div");
      const detailsContent = document.createElement("div");
      const description = document.createElement("p");
      details.className = "menu-item-details";
      detailsContent.className = "menu-item-details-content";
      description.className = "menu-item-description";
      description.textContent = itemDescriptions[name] || "TBA";
      detailsContent.append(image, description);
      details.append(detailsContent);
      tile.replaceChildren(nameCell, details);
    });
  });
}
