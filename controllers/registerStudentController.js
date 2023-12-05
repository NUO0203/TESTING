const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

async function registerController(req, res) {
  const { fname, lname, username, password } = req.body;

  try {
    // Check the route to determine the registration type
    const isTechnician = req.path == '/register_technician';

    // Hash the password
    const saltRounds = 12;
    const passwordHashed = await bcrypt.hash(password, saltRounds);

    // Create a new user document and save it to the database
    const newUser = new User({
      fName: fname,
      lName: lname,
      username: username,
      password: passwordHashed,
      pic: 'images/profile-icon.jpg',
      bio: '',
      technician: isTechnician ? 1 : 0, // Set technician flag based on the route
    });
    await newUser.save();

    // Registration successful, send a success response
    res.json({ success: true, message: `Student account "${username}" has been successfully registered.` });
  } catch (error) {
    // Handle any errors that may occur during the registration process
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred during registration' });
  }
}

module.exports = registerController;
