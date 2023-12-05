async function editPic() {
    var newPic = prompt("Enter the URL of your new profile picture:");
    
    // Update the account pic in the database
    const response = await fetch('/profile/update_ppic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            newPic: newPic
        })
    });

    const data = await response.json();

    // Display the error message from the server
    // Check if edit was successful
    if (data.success) {
        // Display success message and reload profile page
        window.alert(data.message);
        window.location.href = 'profile';
    } else {
        // Display the error message from the server
        window.alert(data.message);
    }
}

async function editBio() {
    // Prompt the user to enter a new bio
    var newBio = prompt("Enter your new bio:");

    // Update the account bio in the database
    const response = await fetch('/profile/update_pbio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            newBio: newBio
        })
    });

    const data = await response.json();

    // Display the error message from the server
    // Check if edit was successful
    if (data.success) {
        // Display success message and reload profile page
        window.alert(data.message);
        window.location.href = 'profile';
    } else {
        // Display the error message from the server
        window.alert(data.message);
    }
}

async function deleteAccount() {
    // Delete the account from the database
    const response = await fetch('/profile/delete_acc', {
        method: 'POST'
    });

    const data = await response.json();

    // Display the error message from the server
    // Check if deletion was successful
    if (data.success) {
        // Display success message and redirect to home page
        window.alert(data.message);
        window.location.href = '/';
    } else {
        // Display the error message from the server
        window.alert(data.message);
    }
}

function deleteConfirm(){
    if (confirm('Are you sure you want to delete this account?') == 1) {
        deleteAccount();
    } else {
        window.location.href = 'profile';
    }
}
