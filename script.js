const reviewForm = document.getElementById("reviewForm");
const thankYouMsg = document.getElementById("thankYouMsg");
const toggleFormBtn = document.getElementById("toggleFormBtn");
const addForm = document.getElementById("addForm");
const starPicker = document.getElementById("starPicker");

if (reviewForm && toggleFormBtn && addForm && starPicker) {
  let selectedRating = 0;
  const stars = Array.from(starPicker.getElementsByTagName("span"));

  function updateStars() {
    stars.forEach((star) => {
      const value = Number(star.dataset.v || 0);
      star.classList.toggle("active", value <= selectedRating);
    });
  }

  // Star rating logic
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      selectedRating = Number(star.dataset.v || 0);
      updateStars();
    });
  });

  // Toggle review form
  toggleFormBtn.addEventListener("click", () => {
    addForm.classList.toggle("show");
    toggleFormBtn.textContent = addForm.classList.contains("show")
      ? "✕ Close form"
      : "+ Write a review";
  });

  // Submit review
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("nameInput");
    const textInput = document.getElementById("textInput");

    const name = nameInput ? nameInput.value.trim() : "";
    const reviewText = textInput ? textInput.value.trim() : "";

    if (selectedRating === 0) {
      alert("Please choose a star rating first.");
      return;
    }

    if (!name || !reviewText) {
      alert("Please fill in your name and review before submitting.");
      return;
    }

    if (thankYouMsg) {
      thankYouMsg.textContent = `Salamat, ${name}! Thank you for your ${selectedRating}-star review for Joey's Restaurant Café.`;
    }

    alert(`Thank you for your feedback, ${name}!`);

    // Reset form
    reviewForm.reset();
    selectedRating = 0;
    updateStars();

    // Hide form again
    addForm.classList.remove("show");
    toggleFormBtn.textContent = "+ Write a review";
  });
}
