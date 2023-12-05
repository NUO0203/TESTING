const User = require('../models/UserModel');
const Reservation = require('../models/ReserveModel');


  async function getUser(req, res) {

    const selectedReservee = req.body.reservee;

    console.log('Selected Reservee:', selectedReservee);

    try {
      // Find the user's profile based on the selectedReservee value in the MongoDB
      const selectedUser = await User.findOne({ username: selectedReservee });

      console.log('Selected User:', selectedUser);

      if (!selectedUser) {
        // Handle case when the selected user doesn't exist

        //res.send('Selected user not found');
        return res.status(400).send('<script>alert("No User Selected"); window.location.href = "/seat_selection";</script>');
        return;
      }

      // Render the profile page with the selected user's data
      res.render('other_profiles', selectedUser);
    } catch (error) {
      // Handle any database errors
      console.error('Error fetching user:', error);
      res.send('Error fetching user profile');
    }
  }
  
  async function deleteReservations(req, res) {
    try {
      await Reservation.deleteMany({ seatNum: -1 });
      console.log('Reservations with seatNum: -1 deleted successfully.');
      res.sendStatus(200);
    } catch (error) {
      console.error('Error deleting reservations:', error);
      res.sendStatus(500);
    }
  }


module.exports = {
  deleteReservations,
  getUser
};
