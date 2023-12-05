function removeSelectedReservations() {
  const checkboxes = document.querySelectorAll('input[name="reservationsToDelete"]:checked');
  const reservationsToDelete = Array.from(checkboxes).map(checkbox => checkbox.value);

  if (reservationsToDelete.length === 0) {
    alert('Please select at least one reservation to remove.');
    return;
  }

  // Make an AJAX request to delete the selected reservations
  fetch('/remove', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ reservationsToDelete })
  })
    .then(response => {
      if (response.ok) {
        // If the request was successful, reload the page to reflect the updated data
        location.reload();
      } else {
        alert('Failed to remove reservations. Please try again later.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
}

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
  });
