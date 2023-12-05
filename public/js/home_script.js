// For login
const loginButton = document.getElementById('login-button');
const loginForm = document.getElementById('login-form');

loginButton.addEventListener('click', function() {
loginForm.classList.toggle('hidden');
});

// For register
const registerButton = document.getElementById('register-button');
const registerForm = document.getElementById('register-form');

registerButton.addEventListener('click', function() {
registerForm.classList.toggle('hidden');
});