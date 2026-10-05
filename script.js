const reviewForm = document.getElementById("reviewForm");
const thankYouMsg = document.getElementById("thankYouMsg");
const toggleFormBtn = document.getElementById("toggleFormBtn");
const addForm = document.getElementById("addForm");
const starPicker = document.getElementById("starPicker");

let selectedRating = 0;
const stars = starPicker.getElementsByTagName("span");

// Star rating logic
for (let star of stars) {
  star.addEventListener("click", () => {
    selectedRating = Number(star.getAttribute("data-v"));
    for (let s of stars) {
      s.classList.toggle("active", Number(s.getAttribute("data-v")) <= selectedRating);
    }
  });
}

// Toggle form
toggleFormBtn.addEventListener("click", () => {
  addForm.classList.toggle("show");
  toggleFormBtn.innerText = addForm.classList.contains("show")
    ? "✕ Close form"
    : "+ Write a review";
});

// Submit review
reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (selectedRating === 0) {
    alert("Please choose a star rating first.");
    return;
  }

  const name = document.getElementById("nameInput").value;
  thankYouMsg.innerText = `Salamat, ${name}! Thank you for your ${selectedRating}-star review for Joey's Restaurant Café.`;
  alert(`Thank you for your feedback, ${name}!`);

  // Reset form
  reviewForm.reset();
  for (let s of stars) s.classList.remove("active");
  selectedRating = 0;

  // Hide form again
  addForm.classList.remove("show");
  toggleFormBtn.innerText = "+ Write a review";
});
