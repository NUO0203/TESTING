document.addEventListener('DOMContentLoaded', () => {
  // Boolean variables for filled inputs
  var usernameFilled = false;
  var pwFilled = false;

  // First, disable the login button
  document.getElementById('loginbutton').disabled = true;

  // Create function for 'keyup' event of 'username' (for username field validation)
  document.getElementById('username').addEventListener('keyup', async () => {
    // Delete any leading and trailing whitespace if the user enters one
    document.getElementById('username').value = validator.trim(document.getElementById('username').value);

    // Reset error message
    document.getElementById('error-message').textContent = '';

    // Check if the text field is filled up (containing at least 1 character)
    usernameFilled = !validator.isEmpty(document.getElementById('username').value);

    // Check if username and password fields are all filled
    if (usernameFilled && pwFilled) {
      document.getElementById('loginbutton').disabled = false;
    } else {
      document.getElementById('loginbutton').disabled = true;
    }
  });

  // Create function for 'keyup' event of 'password' (for username field validation)
  document.getElementById('password').addEventListener('keyup', async () => {
    // Delete any leading and trailing whitespace if the user enters one
    document.getElementById('password').value = validator.trim(document.getElementById('password').value);
    
    // Reset error message
    document.getElementById('error-message').textContent = '';

    // Check if the text field is filled up (containing at least 1 character)
    pwFilled = !validator.isEmpty(document.getElementById('password').value);

    // Check if username and password fields are all filled
    if (usernameFilled && pwFilled) {
      document.getElementById('loginbutton').disabled = false;
    } else {
      document.getElementById('loginbutton').disabled = true;
    }
  });

  // Function to validate the login form
  async function validateLoginForm(event) {
    event.preventDefault();

    // Get inputs
    var usernameInput = document.getElementById('username').value;
    var passwordInput = document.getElementById('password').value;

    // Get error message element
    var errorMessage = document.getElementById('error-message');

    try {
      // Send a POST request to the server to check login credentials
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Display success message and redirect to home
        window.alert(data.message);
        window.location.href = '/home';
      } else {
        // Display the error message from the server
        errorMessage.textContent = data.message;
      }
    } catch (error) {
      // Handle any errors that may occur during login
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
  }

  const form = document.querySelector('form');
  form.addEventListener('submit', validateLoginForm);
});
