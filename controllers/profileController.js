const Reservation = require('../models/ReserveModel');
const User = require('../models/UserModel');

async function profileController(req, res) {
  try {
    // Get the username from the session
    const username = req.session.username;

    // Fetch the user data from the database based on the username
    const user = await User.findOne({ username }).lean();

    if (!user) {
      // Handle the case where the user data is not found
      return res.status(404).json({ message: 'User data not found' });
    }

    // Fetch reservations associated with the user
    const reservations = await Reservation.find({ username }).lean();

    // Map reservations to include user data
    const combinedData = reservations.map(reservation => ({
      ...reservation,
      fName: user.fName,
      lName: user.lName,
    }));

    // Render the 'profile' template with the combined data
    res.render('profile', { 
      p_fName: user.fName,
      p_lName: user.lName,
      p_username: user.username,
      p_pic: user.pic,
      p_bio: user.bio,
      technician: user.technician,
      data: combinedData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the user profile' });
  }
}

module.exports = profileController;
