const theater = document.getElementById("theater");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

const rows = 10;
const seatsPerRow = 18;
let ticketPrice = Number(movieSelect.value);  // default ticket price based on selected movie
const rowLetters = "ABCDEFGHIJ";      // row labels for seat numbering

// create theater seating layout
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

    // randomly mark some seats as occupied (40% chance)
    if (Math.random() < 0.4) {
      seat.classList.add("occupied");
    }
    
    row.appendChild(seat);
  }

  theater.appendChild(row);
}

// select all available seats
const seats = document.querySelectorAll(".seat:not(.occupied)");

// add click event to toggle seat selection
seats.forEach(seat => {
  seat.addEventListener("click", () => {
    
    seat.classList.toggle("selected");

    // show seat number inside the seat
    if (seat.classList.contains("selected")) {
      seat.textContent = seat.dataset.label;
    } else {
      seat.textContent = "";
    }

    updateSelection();
  });
});

// update ticket price when movie selection changes
movieSelect.addEventListener("change", () => {
  ticketPrice = Number(movieSelect.value);
  updateSelection();
});

// update seat count and total price
function updateSelection() {

  const selectedSeats = document.querySelectorAll(".seat.selected");

  const seatList = [];
  selectedSeats.forEach(seat => {
    seatList.push(seat.dataset.label);
  });

  count.textContent = selectedSeats.length;
  total.textContent = selectedSeats.length * ticketPrice;
}