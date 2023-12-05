// Small function to check for whitespaces in a string
function hasWhiteSpace(str) {
  return str.indexOf(' ') >= 0;
}

// Main register_student function
document.addEventListener('DOMContentLoaded', () => {
  // Get error message elements
  var usernameError = document.getElementById('username-error');
  var pwError = document.getElementById('pw-error');
  var confirmError = document.getElementById('confirm-error');

  // Boolean variables for valid inputs
  var usernameValid = false;
  var pwValid = false;
  var confirmValid = false;

  // First, disable the submit button
  document.getElementById('submitbutton').disabled = true;

  // Create function for 'keyup' event of 'Regisusername' (for username validation)
  document.getElementById('Regisusername').addEventListener('keyup', async () => {
    // Delete any leading and trailing whitespace if the user enters one
    document.getElementById('Regisusername').value = validator.trim(document.getElementById('Regisusername').value);
    // Check if there are whitespaces in the middle. If so, throw an error.
    if (hasWhiteSpace(document.getElementById('Regisusername').value)) {
      usernameError.textContent = 'Username must not contain any spaces';
      usernameValid = false;
    } else {
      // Check if username is unique
      const response = await fetch('/register_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: document.getElementById('Regisusername').value
        })
      });

      // Evaluate results
      const data = await response.json();
      if (data.success) {
        usernameError.textContent = '';
        usernameValid = true;
      } else {
        usernameError.textContent = data.message;
        usernameValid = false;
      }
    }

    // Check if username, password, and confirm password are all valid
    if (usernameValid && pwValid && confirmValid) {
      document.getElementById('submitbutton').disabled = false;
    } else {
      document.getElementById('submitbutton').disabled = true;
    }
  });

  // Create function for 'keyup' event of 'FirstRegispassword' (for password validation)
  document.getElementById('FirstRegispassword').addEventListener('keyup', () => {
    // Send error if (1) password has less than 8 characters, and (2) if password has a whitespace
    if (!validator.isLength(document.getElementById('FirstRegispassword').value, {min: 8})) {
      pwError.textContent = 'Password must contain at least 8 characters';
      pwValid = false;
    } else if (hasWhiteSpace(document.getElementById('FirstRegispassword').value)) {
      pwError.textContent = 'Password must contain no spaces';
      pwValid = false;
    } else {
      pwError.textContent = '';
      pwValid = true;
    }

    // Check if username, password, and confirm password are all valid
    if (usernameValid && pwValid && confirmValid) {
      document.getElementById('submitbutton').disabled = false;
    } else {
      document.getElementById('submitbutton').disabled = true;
    }
  });
  
  // Create function for 'keyup' event of 'SecondRegispassword'Input (for confirm password validation)
  document.getElementById('SecondRegispassword').addEventListener('keyup', () => {
    if (document.getElementById('FirstRegispassword').value == document.getElementById('SecondRegispassword').value) {
      confirmError.textContent = '';
      confirmValid = true;
    } else {
      confirmError.textContent = 'Passwords do not match';
      confirmValid = false;
    }

    // Check if username, password, and confirm password are all valid
    if (usernameValid && pwValid && confirmValid) {
      document.getElementById('submitbutton').disabled = false;
    } else {
      document.getElementById('submitbutton').disabled = true;
    }
  });
  
  // Function to validate the student registration form
  async function validateRegisterStudentForm(event) {
    event.preventDefault();

    // Get inputs
    var fnameInput = document.getElementById('Regisfname').value;
    var lnameInput = document.getElementById('Regislname').value;
    var usernameInput = document.getElementById('Regisusername').value;
    var pwInput = document.getElementById('FirstRegispassword').value;

    try {
      // Trim inputs of name fields
      fnameInput = validator.trim(fnameInput);
      lnameInput = validator.trim(lnameInput);

      // Send a POST request to the server
      const response = await fetch('/register_student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: fnameInput,
          lname: lnameInput,
          username: usernameInput,
          password: pwInput,
        }),
      });

      const data = await response.json();

      // Display the error message from the server
      // Check if registration was successful
      if (data.success) {
        // Display success message and redirect to the login page
        window.alert(data.message);
        window.location.href = '/login'; // Replace '/login' with the correct login page URL
      } else {
        // Display the error message from the server
        window.alert(data.message);
      }
    } catch (error) {
      // Handle any errors that may occur during the registration process
      console.error(error);
      window.alert('An error occurred during registration');
    }
  }

  // Get the form element and add the submit event listener
  const form = document.querySelector('form');
  form.addEventListener('submit', validateRegisterStudentForm);
});
