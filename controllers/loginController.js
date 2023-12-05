const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

async function loginController(req, res) {
  const { username, password } = req.body;

  try {
    // Get user
    const user = await User.findOne({ username: username });

    // Get password validation with hashed password stored in the database
    const passwordValid = await bcrypt.compare(password, user.password);

    // Check if the user exists in the database, or if the password matches the user's password in the database
    if (!user || !passwordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Store the username in the session
    req.session.username = username;

    // Login successful, send a success response
    res.json({ success: true, message: `Login successful\nWelcome, ${user.fName} ${user.lName}` });
  } catch (error) {
    // Handle any errors that may occur during login
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
}

module.exports = loginController;
