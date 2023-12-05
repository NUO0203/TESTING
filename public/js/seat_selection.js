document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.querySelector('.search-icon');
  const searchBar = document.querySelector('.search-bar');
  const searchInput = document.querySelector('.search-bar input[type="text"]');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidecloseBtn = document.querySelector('.sidebar-close-btn');
  const sidebar = document.querySelector('.sidebar');
  const dateInput = document.getElementById('date');
  const today = new Date();
  const maxDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const minDate = today.toISOString().split('T')[0];
  const closeBtn = document.querySelector('.close');

  function openOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
  }
  
  function closeOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
  }
  
  const nextButtons = document.querySelectorAll('#reservee-btn');
  for (const button of nextButtons) {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('Button clicked');
      openOverlay();
    });
  }

  closeBtn.addEventListener('click', closeOverlay);

  function toggleSearchBar() {
    searchBar.classList.toggle('show');
  }
  
  sidecloseBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });

  searchIcon.addEventListener('click', () => {
    searchBar.classList.toggle('expanded');
    searchInput.focus();
  });

  document.addEventListener('click', (event) => {
    const isClickInsideSearch = searchIcon.contains(event.target) || searchBar.contains(event.target);
    const isClickInsideSidebar = sidebar.contains(event.target) || sidebarToggle.contains(event.target);

    if (!isClickInsideSearch && searchBar.classList.contains('expanded')) {
      searchBar.classList.remove('expanded');
    }

    if (!isClickInsideSidebar && sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
    }
  });

  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
});
/*
window.addEventListener('DOMContentLoaded', (event) => {
  // Retrieve the username from the session storage
  const username = sessionStorage.getItem('currentuser');

  // Display the username in the HTML element
  const usernameDisplay = document.getElementById('username-display');
  if (username) {
      usernameDisplay.textContent = 'Logged in as: ' + username;
  } else {
      usernameDisplay.textContent = 'Username not found';
  }
}); */

document.addEventListener("DOMContentLoaded", function () {
  var currentUser = sessionStorage.getItem("currentuser");
  var tecStatus = sessionStorage.getItem("tecstatus");
  var Check = parseInt(tecStatus);

  //var usernameDisplay = document.getElementById("username-display");
  //usernameDisplay.textContent = currentUser;  
  // Assuming you have a variable called 'hideElement' that determines whether to hide the element or not
  var hideElement = true; // Set it to 'true' to hide the element
  if(Check == 1){
    hideElement = false;
  }

  // Get a reference to the element
  var element = document.getElementById("remove-reservation-menu");

  // Check the value of the variable and hide the element if necessary
  if (hideElement) {
    element.style.display = "none"; // Hide the element by setting its 'display' property to 'none'
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Retrieve the stored values from localStorage
  var date = localStorage.getItem('reservationDate');
  var timeIn = localStorage.getItem('reservationTimeIn');
  var timeOut = localStorage.getItem('reservationTimeOut');
  var labName = localStorage.getItem('reservationRoom');
  var tecStatus = localStorage.getItem('tecStatus');
  var email = localStorage.getItem('reservationEmail');

  // Format the time in hh:mm AM/PM format
  var formattedTimeIn = formatTime(timeIn);
  var formattedTimeOut = formatTime(timeOut);

  // Update the content of the HTML elements
  document.getElementById('displayDate').textContent = 'Date: ' + date;
  document.getElementById('displayTimeIn').textContent = 'Time In: ' + formattedTimeIn;
  document.getElementById('displayTimeOut').textContent = 'Time Out: ' + formattedTimeOut;
  document.getElementById('displayLabName').textContent = 'Lab Name: ' + labName;

  if (tecStatus === '1' && email == "admin@dlsu.edu.ph") {
    document.getElementById('displayEmail').textContent = 'Email: ' + email;
  }
});

// Function to format time in hh:mm AM/PM format
function formatTime(time) {
  var hour = Math.floor(time / 2) + 7; // Convert time index to hour
  var minute = (time % 2) * 30; // Convert time index to minute
  var period = (hour >= 12) ? 'PM' : 'AM'; // Determine AM/PM

  // Adjust hour for PM times
  if (hour > 12) {
    hour -= 12;
  }

  // Pad single-digit hour and minute with leading zeros
  hour = hour.toString().padStart(2, '0');
  minute = minute.toString().padStart(2, '0');

  // Return the formatted time string
  return hour + ':' + minute + ' ' + period;
}


    // Array to determine the seat classes
    var SeatTaken = [];
    var SeatAnonymous = [];
    for (var i = 0; i < 40; i++) {
      SeatTaken[i] = -1;
      SeatAnonymous[i] = -1;
    }
/*       SeatTaken[0] = 'gio_estrada@dlsu.edu.ph';
    SeatTaken[1] = 'gio_estrada@dlsu.edu.ph';
    SeatTaken[3] = 'rain_david@dlsu.edu.ph';
    SeatTaken[39] = 'admin@dlsu.edu.ph';
*/
    SeatAnonymous[3] = 1;
  
    // Function to assign classes to seat elements
    function assignSeatClasses() {
      var seatElements = document.getElementsByClassName('seat');
  //seatElements.length
      for (var i = 0; i < 40; i++) {
        var seatElement = seatElements[i];
        if (SeatTaken[i] === -1) {
          seatElement.classList.add('seat');
        } else {
          seatElement.classList.add('seat-sold');
        }
      }
    }
  
    // Call the function after the DOM has loaded
    document.addEventListener('DOMContentLoaded', function () {
      assignSeatClasses();
    });

     // Call the function after the DOM has loaded
    document.addEventListener('DOMContentLoaded', function () {
      assignSeatClassesAndEvents();
    });

    // Call the function after the DOM has loaded
    document.addEventListener('DOMContentLoaded', function () {
      checkButtonVisibility();
    });

    // Function to handle seat selection
  function selectSeat(seatId) {
    var selectedSeatText = document.getElementById('selectedSeatText');
    selectedSeatText.innerHTML = 'Selected Seat: ' + seatId;
  }

var SeatStatus = -1;
var CheckAnonymous = 0;
  // Function to assign classes and click event to seat elements
  function assignSeatClassesAndEvents() {
    var seats = document.getElementsByClassName('seat');
  for (var i = 0; i < 40; i++) {
    seats[i].addEventListener('click', function() {
      var seatId = this.id;
      var seatIdstay = seatId;
      var selectedSeatText = document.getElementById('selectedSeatText');
      var seatValue = SeatTaken[seatId];
      seatId++;
      
      if (seatValue === -1) {
        SeatStatus = 1;
        CheckAnonymous = 0;
        selectedSeatText.textContent = "Selected Seat Number: " + seatId;
        checkButtonVisibility();
      } else if(SeatAnonymous[seatIdstay] == 1) {
        SeatStatus = 1;
        CheckAnonymous = 1;
        //updateReservationProfileButtonVisibility();
        selectedSeatText.textContent = "Selected Seat Number: " + seatId + ", Reservation Done Anonymously";
        checkButtonVisibility();
       } else {
        SeatStatus = 0;
        CheckAnonymous = 1;
        //updateReservationProfileButtonVisibility();
        selectedSeatText.textContent = "Selected Seat Number: " + seatId + ", Occupied By: " + seatValue;
        checkButtonVisibility();
        
        // Redirect to displayReservationForm function if seatValue is not -1
        selectedSeatText.addEventListener('click', function() {
          if (seatValue !== -1) {
            displayReservationForm(seatId, seatValue);
          }
        });
      }
    });
  }

}

function reserveSeat() {
  var selectedSeatText = document.getElementById('selectedSeatText');
  var seatId = selectedSeatText.textContent.split(": ")[1].trim();

  // Send an AJAX request to update the seatNum of the latest reservation
  fetch('/update_latest_reservation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ seatNum: seatId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Booking confirmed for Seat Number: " + seatId);
        window.location.href = "reserve"; // Redirect to reserve
      } else {
        alert("Seat is Already Occupied");
        window.location.href = "seat_selection";
      }
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while processing the reservation");
    });
}

/*
  // Function to handle form submission and display confirmation
  function reserveSeat() {


  var selectedSeatText = document.getElementById('selectedSeatText');
  var seatId = selectedSeatText.textContent.split(": ")[1].trim(); // Extract seat ID and remove leading/trailing spaces
  var seatValue = SeatTaken[seatId];
  /*if(confirm("Booking confirmed for Seat ID: " + seatId) == 1 && seatValue == 1){
    window.location.href = "reserve"; // Redirect to reserve 
  }*/
/*
  if(SeatStatus == 1 && CheckAnonymous == 0){
    alert("Booking confirmed for Seat Number: " + seatId);
    window.location.href = "reserve"; // Redirect to reserve
  } else {
    alert("Seat is Already Occupied");
    window.location.href = "seat_selection";
  }
   
} */



  // Function to check the visibility of the button
function checkButtonVisibility() {
var reservationProfileBtn = document.getElementById("reservationProfileBtn");

// Check the value of SeatStatus
if (SeatStatus === 0) {
  reservationProfileBtn.style.display = "block";  // Show the button
} else {
  reservationProfileBtn.style.display = "none";   // Hide the button
}
}

function reservationHolder(){
window.location.href = "other_profiles";
}

window.addEventListener('beforeunload', function () {
  // Make an API call to the server to delete reservations with seatNum: -1
  fetch('/delete-reservations', { method: 'DELETE' })
    .then((response) => {
      if (response.ok) {
        console.log('Reservations with seatNum: -1 deleted successfully.');
      } else {
        console.error('Error deleting reservations with seatNum: -1.');
      }
    })
    .catch((error) => {
      console.error('Error deleting reservations:', error);
    });
});





