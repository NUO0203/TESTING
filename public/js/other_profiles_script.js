if (sessionStorage.getItem('profilebio') == null || sessionStorage.getItem('profilebio') == '') {
    sessionStorage.setItem('profilebio', '');
}

var ProfileBio = sessionStorage.getItem('profilebio');

//
if (sessionStorage.getItem('profilepic') == null || sessionStorage.getItem('profilepic') == '') {
    sessionStorage.setItem('profilepic', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/De_La_Salle_University_Seal.svg/1200px-De_La_Salle_University_Seal.svg.png');
}

var ProfilePic = sessionStorage.getItem('profilepic');

function deleteConfirm() {
    if (confirm('Are you sure you want to delete this account?') == 1) {
        window.location.href = 'login';
    } else {
        window.location.href = 'profile';
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    // Retrieve the username from the session storage
    const username1 = "gio_estrada@dlsu.edu.ph";
    const full_name1 = "Gio Estrada";

    // Display the username in the HTML element
    const showname = document.getElementById('pf_name');
    const showemail = document.getElementById('pf_email');

    if (username1) {
        showname.textContent = full_name1;
        showemail.textContent = username1;
    } else {
        showname.textContent = 'Username not found';
    }
});

// Get the HTML elements by their IDs
var nameElement = document.getElementById("pf_name_other");
var emailElement = document.getElementById("pf_email_other");
var bioElement = document.getElementById("pf_bio_other");

// Set the text content of the elements
nameElement.textContent = "John Doe";
emailElement.textContent = "johndoe@example.com";
bioElement.textContent = "This is my bio.";



