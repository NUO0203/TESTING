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

  function openOverlay(roomName) {
    // Get the selected values from the dropdowns
    const date = document.getElementById('date').value;
    const timeIn = document.getElementById('time-in').value;
    const timeOut = document.getElementById('time-out').value;

    // Do something with the selected values (e.g., display in the overlay)
    console.log('Room Name:', roomName);
    console.log('Date:', date);
    console.log('Time In:', timeIn);
    console.log('Time Out:', timeOut);

    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
  }

  function closeOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
  }

  closeBtn.addEventListener('click', closeOverlay);

  const reserveButtons = document.querySelectorAll('.reserve-btn');
  for (const button of reserveButtons) {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const roomName = button.parentNode.querySelector('h4').textContent;
      openOverlay(roomName);
    });
  }

  dateInput.min = minDate;
  dateInput.max = maxDate.toISOString().split('T')[0];

  function updateTimeOut() {
    const timeInSelect = document.getElementById('time-in');
    const timeOutSelect = document.getElementById('time-out');
    const selectedTimeIn = parseInt(timeInSelect.value);
    const timeOutOptions = timeOutSelect.options;

    for (let i = 0; i < timeOutOptions.length; i++) {
      const timeOptionValue = parseInt(timeOutOptions[i].value);
      const timeOption = timeOutOptions[i].text;
      timeOutOptions[i].disabled = timeOptionValue <= selectedTimeIn;
    }
  }

  // Trigger updateTimeOut whenever timeInSelect changes
  document.getElementById('time-in').addEventListener('change', updateTimeOut);
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


