const Reservation = require('../models/ReserveModel');
const User = require('../models/UserModel');

async function reserveController(req, res) {

  var Currentusername = req.session.username; // Get the username from the session
  const date = req.body.date;
  const timeIn = req.body['time-in'];
  const timeOut = req.body['time-out'];
  const labNum = req.body['labNum'];
  const anonymous = req.body['anonymous'];
  const username = req.body['username'];

  const CheckUser = await User.findOne({ username: Currentusername });
  const technician = CheckUser.technician;

  if(technician){
    Currentusername = username;

    if( !Currentusername === undefined){
      return res.status(400).send('<script>alert("Inputs are not correctly provided."); window.location.href = "/reserve";</script>');
    }
  }

  //const CurrentUser = req.session.username;




  

  if ( !date || !timeIn || !timeOut || !labNum || anonymous === undefined) {
    // If any input is missing, display an alert and redirect back to the reservation page
    return res.status(400).send('<script>alert("Inputs are not correctly provided."); window.location.href = "/reserve";</script>');
  }

  try {
    // Convert timeIn and timeOut to strings with the desired format
    const formattedTimeIn = convertTimeIndexToString(timeIn);
    const formattedTimeOut = convertTimeIndexToString(timeOut);

    const newReservation = new Reservation({
      username: Currentusername, // Use the username from the session
      date: date,
      timeIn: formattedTimeIn,
      timeOut: formattedTimeOut,
      seatNum: -1, // Set the seatNum to -1
      labNum: labNum,
      anonymous: anonymous,
    });

    // Save the new reservation to the database
    await newReservation.save();

    // Redirect to a success page or any other desired page
    return res.redirect('/seat_selection');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during reservation' });
  }
}

function convertTimeIndexToString(timeIndex) {
  const timeSlots = [
    '7:30AM', '8:00AM', '8:30AM', '9:00AM', '9:30AM', '10:00AM', '10:30AM', '11:00AM', '11:30AM', '12:00PM',
    '12:30PM', '1:00PM', '1:30PM', '2:00PM', '2:30PM', '3:00PM', '3:30PM', '4:00PM', '4:30PM', '5:00PM'
  ];

  return timeSlots[timeIndex]; 
}

module.exports = reserveController;
