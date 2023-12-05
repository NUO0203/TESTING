const User = require('../models/UserModel');
const Reservation = require('../models/ReserveModel');

async function editController(req, res) {

  const CurrentUser = req.session.username;
  const CheckUser = await User.findOne({ username: CurrentUser });
  var technician = CheckUser.technician;

  var currentusername = req.session.username;
  const { username, date, labNum, seatassignment, timeIn, timeOut } = req.body;

  console.log('Username:', username);
  console.log('Date:', date);
  console.log('Lab Number:', labNum);
  console.log('Seat Assignment:', seatassignment);
  console.log('Time In:', timeIn);
  console.log('Time Out:', timeOut);

  var CurrentTimeIn;
  var CurrentTimeOut;

  if(timeIn==0){
    CurrentTimeIn="7:30AM";
  } else if (timeIn==1){
    CurrentTimeIn="8:00AM";
  } else if (timeIn==2){
    CurrentTimeIn="8:30AM";
  } else if (timeIn==3){
    CurrentTimeIn="9:00AM";
  } else if (timeIn==4){
    CurrentTimeIn="9:30AM";
  } else if (timeIn==5){
    CurrentTimeIn="10:00AM";
  } else if (timeIn==6){
    CurrentTimeIn="10:30AM";
  } else if (timeIn==7){
    CurrentTimeIn="11:00AM";
  } else if (timeIn==8){
    CurrentTimeIn="11:30AM";
  } else if (timeIn==9){
    CurrentTimeIn="12:00PM";
  } else if (timeIn==10){
    CurrentTimeIn="12:30PM";
  } else if (timeIn==11){
    CurrentTimeIn="1:00PM";
  } else if (timeIn==12){
    CurrentTimeIn="1:30PM";
  } else if (timeIn==13){
    CurrentTimeIn="2:00PM";
  } else if (timeIn==14){
    CurrentTimeIn="2:30PM";
  } else if (timeIn==15){
    CurrentTimeIn="3:00PM";
  } else if (timeIn==16){
    CurrentTimeIn="3:30PM";
  } else if (timeIn==17){
    CurrentTimeIn="4:00PM";
  } else if (timeIn==18){
    CurrentTimeIn="4:30PM";
  } else if (timeIn==19){
    CurrentTimeIn="5:00PM";
  }

  if(timeOut==0){
    CurrentTimeOut="7:30AM";
  } else if (timeOut==1){
    CurrentTimeOut="8:00AM";
  } else if (timeOut==2){
    CurrentTimeOut="8:30AM";
  } else if (timeOut==3){
    CurrentTimeOut="9:00AM";
  } else if (timeOut==4){
    CurrentTimeOut="9:30AM";
  } else if (timeOut==5){
    CurrentTimeOut="10:00AM";
  } else if (timeOut==6){
    CurrentTimeOut="10:30AM";
  } else if (timeOut==7){
    CurrentTimeOut="11:00AM";
  } else if (timeOut==8){
    CurrentTimeOut="11:30AM";
  } else if (timeOut==9){
    CurrentTimeOut="12:00PM";
  } else if (timeOut==10){
    CurrentTimeOut="12:30PM";
  } else if (timeOut==11){
    CurrentTimeOut="1:00PM";
  } else if (timeOut==12){
    CurrentTimeOut="1:30PM";
  } else if (timeOut==13){
    CurrentTimeOut="2:00PM";
  } else if (timeOut==14){
    CurrentTimeOut="2:30PM";
  } else if (timeOut==15){
    CurrentTimeOut="3:00PM";
  } else if (timeOut==16){
    CurrentTimeOut="3:30PM";
  } else if (timeOut==17){
    CurrentTimeOut="4:00PM";
  } else if (timeOut==18){
    CurrentTimeOut="4:30PM";
  } else if (timeOut==19){
    CurrentTimeOut="5:00PM";
  }



  try {

    if(technician){
      currentusername = username;
    }
    
    // Find the reservation with matching date, timeIn, timeOut, and labNum
    const matchingReservation = await Reservation.findOne({
      username: currentusername,
      date: date,
      timeIn: CurrentTimeIn,
      timeOut: CurrentTimeOut,
      seatNum: seatassignment,
      labNum: labNum,
    }); 

    // Check if a reservation with matching details is found
    if (!matchingReservation) {
      // If no matching reservation found, show an alert and redirect to the seat_selection page
      return res.status(400).send('<script>alert("No matching reservation found"); window.location.href="/edit";</script>');
    }

    // Update the seatNum of the matching reservation to -1
    matchingReservation.seatNum = -1;
    await matchingReservation.save();

    // Return a success response
    res.redirect('/seat_selection');
  } catch (error) {
    // Handle any errors that may occur during the update
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred during reservation update' });
  }
}

module.exports = editController;
