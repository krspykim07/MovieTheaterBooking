const theater = document.getElementById("theater");
const seatNumbers = document.getElementById("seatNumbers");
const count = document.getElementById("count");
const total = document.getElementById("total");

const rows = 10;
const seatsPerRow = 18;
const ticketPrice = 10;
const rowLetters = "ABCDEFGHIJ";

for (let r = 0; r < rows; r++) {

  const row = document.createElement("div");
  row.classList.add("row");

  // create seats for each row
  for (let s = 0; s < seatsPerRow; s++) {

    const seat = document.createElement("div");
    seat.classList.add("seat");

    // assign seat label (e.g., A1, B5)
    const seatLabel = rowLetters[r] + (s + 1);
    seat.dataset.label = seatLabel;

    // create aisle gaps
    if (s === 3 || s === seatsPerRow - 5) {
      seat.classList.add("aisle");
    }

    // randomly mark some seats as occupied (20% chance)
    if (Math.random() < 0.2) {
      seat.classList.add("occupied");
    }
    
    row.appendChild(seat);
  }

  theater.appendChild(row);
}

const seats = document.querySelectorAll(".seat:not(.occupied)");

// add click event to toggle seat selection
seats.forEach(seat => {
  seat.addEventListener("click", () => {
    seat.classList.toggle("selected");
    updateSelection();
  });
});

function updateSelection() {

  const selectedSeats = document.querySelectorAll(".seat.selected");

  const seatList = [];
  selectedSeats.forEach(seat => {
    seatList.push(seat.dataset.label);
  });

  seatNumbers.textContent = seatList.length ? seatList.join(", ") : "None";
  count.textContent = selectedSeats.length;
  total.textContent = selectedSeats.length * ticketPrice;
}