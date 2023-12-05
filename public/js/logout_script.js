async function logout_user() {
    // Delete the account from the database
    const response = await fetch('/logout', {
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

function logout() {
    if (confirm('Are you sure you want to log out?') == 1) {
        logout_user();
    }
}