let reviewForm = document.getElementById("reviewForm");
let thankYouMsg = document.getElementById("thankYouMsg");
let toggleFormBtn = document.getElementById("toggleFormBtn");
let addForm = document.getElementById("addForm");
let starPicker = document.getElementById("starPicker");

let selectedRating = 0;

let stars = starPicker.getElementsByTagName("span");

for (let i = 0; i < stars.length; i++) {
  stars[i].style.cursor = "pointer";
  stars[i].style.fontSize = "1.5rem";
  stars[i].style.color = "#ccc"; 
  
  stars[i].addEventListener("click", function() {
    
    selectedRating = this.getAttribute("data-v");
    
    for (let j = 0; j < stars.length; j++) {
      if (stars[j].getAttribute("data-v") <= selectedRating) {
        stars[j].style.color = "#ffb400"; 
      } else {
        stars[j].style.color = "#ccc"; 
      }
    }
  });
}

toggleFormBtn.addEventListener("click", function() {
  if (addForm.style.display === "none" || addForm.style.display === "") {
    addForm.style.display = "block";
    toggleFormBtn.innerText = "✕ Close form";
  } else {
    addForm.style.display = "none";
    toggleFormBtn.innerText = "+ Write a review";
  }
});

reviewForm.addEventListener("submit", function(event) {
  event.preventDefault(); 

  let name = document.getElementById("nameInput").value;
  
  thankYouMsg.innerText = "Salamat, " + name + "! Thank you for your " + selectedRating + "-star review for Joey's Restaurant Café.";
  
  alert("Thank you for your feedback, " + name + "!");
  
  reviewForm.reset();
  for (let i = 0; i < stars.length; i++) {
    stars[i].style.color = "#ccc";
  }
  selectedRating = 0;
  
  addForm.style.display = "none";
  toggleFormBtn.innerText = "+ Write a review";
});