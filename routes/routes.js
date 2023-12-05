const express = require('express');
const router = express.Router();
const Reservation = require('../models/ReserveModel');
const User = require('../models/UserModel');

router.use(express.json());

router.use(express.urlencoded({ extended: true }));

// Import the controller functions for handling the routes
const loginController = require('../controllers/loginController');
const registerStudentController = require('../controllers/registerStudentController');
const registerTechnicianController = require('../controllers/registerTechnicianController');
const reserveController = require('../controllers/reserveController');
const profileController = require('../controllers/profileController');
const seatsController = require('../controllers/seatsController');
const editController = require('../controllers/editController');

// Small function for error page
function showError(code, msg) {
  return `<!DOCTYPE html><html><head><title>Error ${code}</title><style>*{text-align:center;}</style></head><body><h1><b>ERROR ${code}</b></h1><hr><p>${msg}</p><br><a href="home">Return</a></body></html>`;
}

// Small function for quick user authentication check
const authHandler = (req, res, next) => {
  if (!req.session.username) {
    res.status(403).send(showError(403, 'Access denied.'));
  } else {
    next();
  }
}

// Define the routes and associate them with their respective controller functions

// -------------------  GET FUNCTIONS  -------------------

router.get('/', (req, res) => {
  if (req.session.username) {
    res.redirect('reserve');
  } else {
    res.redirect('home');
  }
});

router.get('/home', (req, res) => {
  if (req.session.username) {
    res.redirect('reserve');
  } else {
    res.render('home');
  }
});

router.get('/login', (req, res) => {
  if (req.session.username) {
    res.status(403).send(showError(403, 'You are already logged in.'));
  } else {
    res.render('login');
  }
});

router.get('/register_student', (req, res) => {
  if (req.session.username) {
    res.status(403).send(showError(403, 'You need to be logged out to register for an account.'));
  } else {
    res.render('register_student');
  }
});

router.get('/register_technician', (req, res) => {
  if (req.session.username) {
    res.status(403).send(showError(403, 'You need to be logged out to register for an account.'));
  } else {
    res.render('register_technician');
  }
});

router.get('/profile', authHandler, profileController);

function convertStringToNum (TimeString){
  var FinalTime;
  if (TimeString === "7:30AM") {
    FinalTime = 0;
  } else if (TimeString === "8:00AM") {
    FinalTime = 1;
  } else if (TimeString === "8:30AM") {
    FinalTime = 2;
  } else if (TimeString === "9:00AM") {
    FinalTime = 3;
  } else if (TimeString === "9:30AM") {
    FinalTime = 4;
  } else if (TimeString === "10:00AM") {
    FinalTime = 5;
  } else if (TimeString === "10:30AM") {
    FinalTime = 6;
  } else if (TimeString === "11:00AM") {
    FinalTime = 7;
  } else if (TimeString === "11:30AM") {
    FinalTime = 8;
  } else if (TimeString === "12:00PM") {
    FinalTime = 9;
  } else if (TimeString === "12:30PM") {
    FinalTime = 10;
  } else if (TimeString === "1:00PM") {
    FinalTime = 11;
  } else if (TimeString === "1:30PM") {
    FinalTime = 12;
  } else if (TimeString === "2:00PM") {
    FinalTime = 13;
  } else if (TimeString === "2:30PM") {
    FinalTime = 14;
  } else if (TimeString === "3:00PM") {
    FinalTime = 15;
  } else if (TimeString === "3:30PM") {
    FinalTime = 16;
  } else if (TimeString === "4:00PM") {
    FinalTime = 17;
  } else if (TimeString === "4:30PM") {
    FinalTime = 18;
  } else if (TimeString === "5:00PM") {
    FinalTime = 19;
  }

  return FinalTime;
}

router.get('/reserve', async (req, res) => {
  if (req.session.username) {

    //Get todays date
    // Get the current date and format it as YYYY-MM-DD
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    var day = String(currentDate.getDate()).padStart(2, '0');
    

    // Get the current time in hours and minutes
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour clock
    hours %= 12;
    hours = hours || 12; // Handle midnight as 12

    // Round minutes to the nearest 30
    if (minutes < 30) {
      minutes = 30;
    } else {
      hours += 1;
      minutes = 0;
    }

    // Format minutes with leading zeros
    minutes = String(minutes).padStart(2, '0');

    var currentTime = `${hours}:${minutes}${ampm}`;
/*
    if (ampm == 'PM ' && hours >= 5  ){
          currentTime = '7:30AM'
          var dayAsNumber = parseInt(day, 10);
          dayAsNumber++;
          console.log("Current Time: ", CurrentTime);
          console.log("Day: ", dayAsNumber);
    } else if (ampm == 'AM' && hours < 7 ){
          currentTime = '7:30AM'
          var dayAsNumber = parseInt(day, 10);
          dayAsNumber++;
          console.log("Current Time: ", CurrentTime);
          console.log("Day: ", dayAsNumber);
    } */

     if(currentTime == '5:00PM' ||
       currentTime == '5:30PM' || 
       currentTime == '6:00PM' ||
       currentTime == '6:30PM' || 
       currentTime == '7:00PM' ||
       currentTime == '7:30PM' ||
       currentTime == '8:00PM' ||
       currentTime == '8:30PM' ||
       currentTime == '9:00PM' || 
       currentTime == '9:30PM' ||
       currentTime == '10:00PM' ||
       currentTime == '10:30PM' ||
       currentTime == '11:00PM' ||
       currentTime == '11:30PM' ){
        var dayAsNumber = parseInt(day, 10);
          dayAsNumber++;
          currentTime = '7:30AM';
          day = String(dayAsNumber);
          day = day.padStart(2, '0');
       } else if ( currentTime == '12:00AM' ||
       currentTime == '12:30AM' ||
       currentTime == '1:00AM' ||
       currentTime == '1:30AM' ||
       currentTime == '2:00AM' ||
       currentTime == '2:30AM' ||
       currentTime == '3:00AM' ||
       currentTime == '3:30AM' ||
       currentTime == '4:00AM' ||
       currentTime == '4:30AM' ||
       currentTime == '5:00AM' ||
       currentTime == '5:30AM' ||
       currentTime == '6:00AM' ||
       currentTime == '6:30AM' ||
       currentTime == '7:00AM'){

        currentTime = '7:30AM';
       }

    //day = String(dayAsNumber);
    // Use padStart() to ensure day is a two-digit number
    //day = day.padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log("Formatted Date: ", formattedDate);
    console.log("CurrentTime:", currentTime);

    const DateReservation1 = await Reservation.find({
      date: formattedDate,
      labNum: 1,
    })

    const ConvertedTime= convertStringToNum(currentTime);
    var TotalOccupied1 = 0;
    DateReservation1.forEach((reservation1) => {
      if(convertStringToNum(reservation1.timeIn) <= ConvertedTime &&
         convertStringToNum(reservation1.timeOut) >= ConvertedTime){
          TotalOccupied1++;
         }
    });
    
    const TotalOpenLab1 = 40-TotalOccupied1;

    const DateReservation2 = await Reservation.find({
      date: formattedDate,
      labNum: 2,
    })

  
    var TotalOccupied2 = 0;
    DateReservation2.forEach((reservation2) => {
      if(convertStringToNum(reservation2.timeIn) <= ConvertedTime &&
         convertStringToNum(reservation2.timeOut) >= ConvertedTime){
          TotalOccupied2++;
         }
    });
    
    const TotalOpenLab2 = 40-TotalOccupied2;

    const DateReservation3 = await Reservation.find({
      date: formattedDate,
      labNum: 3,
    })

  
    var TotalOccupied3 = 0;
    DateReservation3.forEach((reservation3) => {
      if(convertStringToNum(reservation3.timeIn) <= ConvertedTime &&
         convertStringToNum(reservation3.timeOut) >= ConvertedTime){
          TotalOccupied3++;
         }
    });
    
    const TotalOpenLab3 = 40-TotalOccupied3;
    


    const user = await User.findOne({ username: req.session.username });

    res.render('reserve', { username: user.username, fName: user.fName, lName: user.lName, technician: user.technician, TotalOpenLab1, TotalOpenLab2, TotalOpenLab3 });
  } else {
    res.status(403).send(showError(403, 'You need to be logged in to place reservations.'));
  }
}); 

router.get('/seat_selection', async (req, res) => {
  if (req.session.username) {
    try {
      const username = req.session.username;
      const latestReservation = await Reservation.findOne({ seatNum: -1 }).sort({ _id: -1 });
  
      // Check if a reservation was found
      if (!latestReservation) {
        return res.render('seat_selection', { username, latestReservation: null });
      }
  
      const matchingReservations = await Reservation.find({
        date: latestReservation.date,
        labNum: latestReservation.labNum,
      });
  
      var currentTimeIn= -1;
      var currentTimeOut= -1;
      var TakenSeatNumber = [];
      var ReserveeName = [];
      var DropDownReservee = [];
  
      if (latestReservation.timeIn === "7:30AM") {
        currentTimeIn = 0;
      } else if (latestReservation.timeIn === "8:00AM") {
        currentTimeIn = 1;
      } else if (latestReservation.timeIn === "8:30AM") {
        currentTimeIn = 2;
      } else if (latestReservation.timeIn === "9:00AM") {
        currentTimeIn = 3;
      } else if (latestReservation.timeIn === "9:30AM") {
        currentTimeIn = 4;
      } else if (latestReservation.timeIn === "10:00AM") {
        currentTimeIn = 5;
      } else if (latestReservation.timeIn === "10:30AM") {
        currentTimeIn = 6;
      } else if (latestReservation.timeIn === "11:00AM") {
        currentTimeIn = 7;
      } else if (latestReservation.timeIn === "11:30AM") {
        currentTimeIn = 8;
      } else if (latestReservation.timeIn === "12:00PM") {
        currentTimeIn = 9;
      } else if (latestReservation.timeIn === "12:30PM") {
        currentTimeIn = 10;
      } else if (latestReservation.timeIn === "1:00PM") {
        currentTimeIn = 11;
      } else if (latestReservation.timeIn === "1:30PM") {
        currentTimeIn = 12;
      } else if (latestReservation.timeIn === "2:00PM") {
        currentTimeIn = 13;
      } else if (latestReservation.timeIn === "2:30PM") {
        currentTimeIn = 14;
      } else if (latestReservation.timeIn === "3:00PM") {
        currentTimeIn = 15;
      } else if (latestReservation.timeIn === "3:30PM") {
        currentTimeIn = 16;
      } else if (latestReservation.timeIn === "4:00PM") {
        currentTimeIn = 17;
      } else if (latestReservation.timeIn === "4:30PM") {
        currentTimeIn = 18;
      } else if (latestReservation.timeIn === "5:00PM") {
        currentTimeIn = 19;
      }
  
      if (latestReservation.timeOut === "7:30AM") {
        currentTimeOut = 0;
      } else if (latestReservation.timeOut === "8:00AM") {
        currentTimeOut = 1;
      } else if (latestReservation.timeOut === "8:30AM") {
        currentTimeOut = 2;
      } else if (latestReservation.timeOut === "9:00AM") {
        currentTimeOut = 3;
      } else if (latestReservation.timeOut === "9:30AM") {
        currentTimeOut = 4;
      } else if (latestReservation.timeOut === "10:00AM") {
        currentTimeOut = 5;
      } else if (latestReservation.timeOut === "10:30AM") {
        currentTimeOut = 6;
      } else if (latestReservation.timeOut === "11:00AM") {
        currentTimeOut = 7;
      } else if (latestReservation.timeOut === "11:30AM") {
        currentTimeOut = 8;
      } else if (latestReservation.timeOut === "12:00PM") {
        currentTimeOut = 9;
      } else if (latestReservation.timeOut === "12:30PM") {
        currentTimeOut = 10;
      } else if (latestReservation.timeOut === "1:00PM") {
        currentTimeOut = 11;
      } else if (latestReservation.timeOut === "1:30PM") {
        currentTimeOut = 12;
      } else if (latestReservation.timeOut === "2:00PM") {
        currentTimeOut = 13;
      } else if (latestReservation.timeOut === "2:30PM") {
        currentTimeOut = 14;
      } else if (latestReservation.timeOut === "3:00PM") {
        currentTimeOut = 15;
      } else if (latestReservation.timeOut === "3:30PM") {
        currentTimeOut = 16;
      } else if (latestReservation.timeOut === "4:00PM") {
        currentTimeOut = 17;
      } else if (latestReservation.timeOut === "4:30PM") {
        currentTimeOut = 18;
      } else if (latestReservation.timeOut === "5:00PM") {
        currentTimeOut = 19;
      }
  
      console.log("Current Time In: ", currentTimeIn);
      console.log("Current Time Out: ", currentTimeOut);
  
      console.log("Matching: ", matchingReservations);
  
      // Loop through the matchingReservations array
      matchingReservations.forEach((reservation) => {
        console.log("Time In:", reservation.timeIn);
        console.log("Time Out:", reservation.timeOut);
  
        var CheckTimeIn = -1;
        var CheckTimeOut = -1;
  
        if (reservation.timeIn == "7:30AM" && reservation.seatNum != -1){
          CheckTimeIn=0;
        } else if(reservation.timeIn == "8:00AM" && reservation.seatNum != -1){
          CheckTimeIn=1;
        } else if(reservation.timeIn == "8:30AM" && reservation.seatNum != -1){
          CheckTimeIn=2;
        } else if(reservation.timeIn == "9:00AM" && reservation.seatNum != -1){
          CheckTimeIn=3;
        } else if(reservation.timeIn == "9:30AM" && reservation.seatNum != -1){
          CheckTimeIn=4;
        } else if(reservation.timeIn == "10:00AM" && reservation.seatNum != -1){
          CheckTimeIn=5;
        } else if(reservation.timeIn == "10:30AM" && reservation.seatNum != -1){
          CheckTimeIn=6;
        } else if(reservation.timeIn == "11:00AM" && reservation.seatNum != -1){
          CheckTimeIn=7;
        } else if(reservation.timeIn == "11:30AM" && reservation.seatNum != -1){
          CheckTimeIn=8;
        } else if(reservation.timeIn == "12:00PM" && reservation.seatNum != -1){
          CheckTimeIn=9;
        } else if(reservation.timeIn == "12:30PM" && reservation.seatNum != -1){
          CheckTimeIn=10;
        } else if(reservation.timeIn == "1:00PM" && reservation.seatNum != -1){
          CheckTimeIn=11;
        } else if(reservation.timeIn == "1:30PM" && reservation.seatNum != -1){
          CheckTimeIn=12;
        } else if(reservation.timeIn == "2:00PM" && reservation.seatNum != -1){
          CheckTimeIn=13;
        } else if(reservation.timeIn == "2:30PM" && reservation.seatNum != -1){
          CheckTimeIn=14;
        } else if(reservation.timeIn == "3:00PM" && reservation.seatNum != -1){
          CheckTimeIn=15;
        } else if(reservation.timeIn == "3:30PM" && reservation.seatNum != -1){
          CheckTimeIn=16;
        } else if(reservation.timeIn == "4:00PM" && reservation.seatNum != -1){
          CheckTimeIn=17;
        } else if(reservation.timeIn == "4:30PM" && reservation.seatNum != -1){
          CheckTimeIn=18;
        } else if(reservation.timeIn == "5:00PM" && reservation.seatNum != -1){
          CheckTimeIn=19;
        }
  
        if (reservation.timeOut == "7:30AM" && reservation.seatNum != -1){
          CheckTimeOut=0;
        } else if(reservation.timeOut == "8:00AM" && reservation.seatNum != -1){
          CheckTimeOut=1;
        } else if(reservation.timeOut == "8:30AM" && reservation.seatNum != -1){
          CheckTimeOut=2;
        } else if(reservation.timeOut == "9:00AM" && reservation.seatNum != -1){
          CheckTimeOut=3;
        } else if(reservation.timeOut == "9:30AM" && reservation.seatNum != -1){
          CheckTimeIOut=4;
        } else if(reservation.timeOut == "10:00AM" && reservation.seatNum != -1){
          CheckTimeOut=5;
        } else if(reservation.timeOut == "10:30AM" && reservation.seatNum != -1){
          CheckTimeOut=6;
        } else if(reservation.timeOut == "11:00AM" && reservation.seatNum != -1){
          CheckTimeOut=7;
        } else if(reservation.timeOut == "11:30AM" && reservation.seatNum != -1){
          CheckTimeOut=8;
        } else if(reservation.timeOut == "12:00PM" && reservation.seatNum != -1){
          CheckTimeOut=9;
        } else if(reservation.timeOut == "12:30PM" && reservation.seatNum != -1){
          CheckTimeOut=10;
        } else if(reservation.timeOut == "1:00PM" && reservation.seatNum != -1){
          CheckTimeOut=11;
        } else if(reservation.timeOut == "1:30PM" && reservation.seatNum != -1){
          CheckTimeOut=12;
        } else if(reservation.timeOut == "2:00PM" && reservation.seatNum != -1){
          CheckTimeOut=13;
        } else if(reservation.timeOut == "2:30PM" && reservation.seatNum != -1){
          CheckTimeOut=14;
        } else if(reservation.timeOut == "3:00PM" && reservation.seatNum != -1){
          CheckTimeOut=15;
        } else if(reservation.timeOut == "3:30PM" && reservation.seatNum != -1){
          CheckTimeOut=16;
        } else if(reservation.timeOut == "4:00PM" && reservation.seatNum != -1){
          CheckTimeOut=17;
        } else if(reservation.timeOut == "4:30PM" && reservation.seatNum != -1){
          CheckTimeOut=18;
        } else if(reservation.timeOut == "5:00PM" && reservation.seatNum != -1){
          CheckTimeOut=19;
        }
  
        if (CheckTimeIn!=-1 ){
          console.log("Check Time In: ", CheckTimeIn);
          console.log("Check Time Out: ", CheckTimeOut);
        }
  
        if ((CheckTimeIn >= currentTimeIn && CheckTimeIn < currentTimeOut) ||
            (CheckTimeOut > currentTimeIn && CheckTimeOut <= currentTimeOut) || 
            (CheckTimeIn == currentTimeIn && CheckTimeOut == currentTimeOut) ||
            (CheckTimeIn <= currentTimeIn && CheckTimeOut > currentTimeOut)) {
  
          TakenSeatNumber.push(reservation.seatNum);
  
          if(reservation.anonymous == 0){
            ReserveeName.push(reservation.username);
  
              if(!DropDownReservee.includes(reservation.username) && reservation.username != username){
                DropDownReservee.push(reservation.username);
              }
          } else if (reservation.anonymous == 1){
            ReserveeName.push("Anonymous");
          }
  
          console.log("inbetween");
  
        } else {
          console.log("not inbetween");
        }
      }); 
      
      console.log("SeatNumbers: ", TakenSeatNumber);
      console.log("Reservee Name: ", ReserveeName);
  
      // Render the seat_selection.hbs template with the latest reservation data
      res.render('seat_selection', { username, latestReservation, TakenSeatNumber, ReserveeName, DropDownReservee });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching reservation data' });
    }
  } else {
    res.status(403).send(showError(403, 'You need to be logged in to place reservations.'));
  }
});

router.get('/edit', async (req, res) => {
  if (req.session.username) {
    /* res.render('edit', { username: req.session.username }); */
    try {
      const username = req.session.username;

    //Get todays date
    // Get the current date and format it as YYYY-MM-DD
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    var day = String(currentDate.getDate()).padStart(2, '0');
    

    // Get the current time in hours and minutes
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour clock
    hours %= 12;
    hours = hours || 12; // Handle midnight as 12

    // Round minutes to the nearest 30
    if (minutes < 30) {
      minutes = 30;
    } else {
      hours += 1;
      minutes = 0;
    }

    // Format minutes with leading zeros
    minutes = String(minutes).padStart(2, '0');

    var currentTime = `${hours}:${minutes}${ampm}`;
/*
    if (ampm == 'PM ' && hours >= 5  ){
          currentTime = '7:30AM'
          var dayAsNumber = parseInt(day, 10);
          dayAsNumber++;
          console.log("Current Time: ", CurrentTime);
          console.log("Day: ", dayAsNumber);
    } else if (ampm == 'AM' && hours < 7 ){
          currentTime = '7:30AM'
          var dayAsNumber = parseInt(day, 10);
          dayAsNumber++;
          console.log("Current Time: ", CurrentTime);
          console.log("Day: ", dayAsNumber);
    } */

       if(currentTime == '5:00PM' ||
       currentTime == '5:30PM' || 
       currentTime == '6:00PM' ||
       currentTime == '6:30PM' || 
       currentTime == '7:00PM' ||
       currentTime == '7:30PM' ||
       currentTime == '8:00PM' ||
       currentTime == '8:30PM' ||
       currentTime == '9:00PM' || 
       currentTime == '9:30PM' ||
       currentTime == '10:00PM' ||
       currentTime == '10:30PM' ||
       currentTime == '11:00PM' ||
       currentTime == '11:30PM' ){
        var dayAsNumber = parseInt(day, 10);
          dayAsNumber++;
          currentTime = '7:30AM';
          day = String(dayAsNumber);
          day = day.padStart(2, '0');
       } else if ( currentTime == '12:00AM' ||
       currentTime == '12:30AM' ||
       currentTime == '1:00AM' ||
       currentTime == '1:30AM' ||
       currentTime == '2:00AM' ||
       currentTime == '2:30AM' ||
       currentTime == '3:00AM' ||
       currentTime == '3:30AM' ||
       currentTime == '4:00AM' ||
       currentTime == '4:30AM' ||
       currentTime == '5:00AM' ||
       currentTime == '5:30AM' ||
       currentTime == '6:00AM' ||
       currentTime == '6:30AM' ||
       currentTime == '7:00AM'){

        currentTime = '7:30AM';
       }

    //day = String(dayAsNumber);
    // Use padStart() to ensure day is a two-digit number
    //day = day.padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log("Formatted Date: ", formattedDate);
    console.log("CurrentTime:", currentTime);

    const DateReservation1 = await Reservation.find({
      date: formattedDate,
      labNum: 1,
    })

    const ConvertedTime= convertStringToNum(currentTime);
    var TotalOccupied1 = 0;
    DateReservation1.forEach((reservation1) => {
      if(convertStringToNum(reservation1.timeIn) <= ConvertedTime &&
         convertStringToNum(reservation1.timeOut) >= ConvertedTime){
          TotalOccupied1++;
         }
    });
    
    const TotalOpenLab1 = 40-TotalOccupied1;

    const DateReservation2 = await Reservation.find({
      date: formattedDate,
      labNum: 2,
    })

  
    var TotalOccupied2 = 0;
    DateReservation2.forEach((reservation2) => {
      if(convertStringToNum(reservation2.timeIn) <= ConvertedTime &&
         convertStringToNum(reservation2.timeOut) >= ConvertedTime){
          TotalOccupied2++;
         }
    });
    
    const TotalOpenLab2 = 40-TotalOccupied2;

    const DateReservation3 = await Reservation.find({
      date: formattedDate,
      labNum: 3,
    })

  
    var TotalOccupied3 = 0;
    DateReservation3.forEach((reservation3) => {
      if(convertStringToNum(reservation3.timeIn) <= ConvertedTime &&
         convertStringToNum(reservation3.timeOut) >= ConvertedTime){
          TotalOccupied3++;
         }
    });
    
    const TotalOpenLab3 = 40-TotalOccupied3;
  
      if (!username) {
        return res.render('edit', { username: null, data: [] });
      }
      /*
      // Fetch reservations made by the logged-in user
      const reservations = await Reservation.find({ username }).lean();
  
      const usernames = reservations.map(reservation => reservation.username);
  
      const users = await User.find({ username: { $in: usernames } }).lean();
  
      const combinedData = reservations.map(reservation => {
        const user = users.find(user => user.username === reservation.username);
        return {
          ...reservation,
          fName: user ? user.fName : '',
          lName: user ? user.lName : '',
        };
      }); */

      // Fetch reservations made by the logged-in user
        const reservations = await Reservation.find({ username }).lean();

        const usernames = reservations.map(reservation => reservation.username);

        // Exclude seatNum equal to -1 from reservations
        const filteredReservations = reservations.filter(reservation => reservation.seatNum !== -1);

        const users = await User.find({ username: { $in: usernames } }).lean();

        const combinedData = filteredReservations.map(reservation => {
          const user = users.find(user => user.username === reservation.username);
          return {
            ...reservation,
            fName: user ? user.fName : '',
            lName: user ? user.lName : '',
          };
        });

      const CurrentUser = req.session.username;
      const CheckUser = await User.findOne({ username: CurrentUser });
      var technician = CheckUser.technician;
  
      // Render the 'edit' template with the filtered reservations
      res.render('edit', { username, data: combinedData, technician , TotalOpenLab1, TotalOpenLab2, TotalOpenLab3});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching user reservations' });
    }
  } else {
    res.status(403).send(showError(403, 'You need to be logged in to edit reservations.'));
  }


}); 


router.get('/other_profiles', (req, res) => {
  if (req.session.username) {
    //const username = req.session.username;
    res.render('other_profiles');
  } else {
    res.status(403).send(showError(403, 'You need to be logged in to view other profiles.'));
  }
});

router.get('/remove', async (req, res) => {
  if (req.session.username) {

     // Set an artificial date and time for testing
     const artificialDate = new Date(); // Set the desired date and time values
     artificialDate.setFullYear(2023); // Set the year
     artificialDate.setMonth(8 - 1); // Set the month (months are zero-based)
     artificialDate.setDate(7); // Set the day
     artificialDate.setHours(7); // Set the hours (24-hour format)
     artificialDate.setMinutes(33); // Set the minutes

     const year = artificialDate.getFullYear();
     const month = String(artificialDate.getMonth() + 1).padStart(2, '0');
     const day = String(artificialDate.getDate()).padStart(2, '0');
     const formattedDate = `${year}-${month}-${day}`;

     let hours = artificialDate.getHours();
    let minutes = artificialDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    //Get todays date
    // Get the current date and format it as YYYY-MM-DD
    /* const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Get the current time in hours and minutes
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM'; */

    // Convert to 12-hour clock
    hours %= 12;
    hours = hours || 12; // Handle midnight as 12
 
    // Format minutes with leading zeros
    minutes = String(minutes).padStart(2, '0');

    var ogTime = `${hours}:${minutes}${ampm}`

    // Round minutes to the nearest 30
    if (minutes >= 1  && minutes < 10) {
      minutes = 0;
    } else if (minutes >= 30 && minutes < 40) {
      minutes = 30;
    }

    var currentTime = `${hours}:${minutes}${ampm}`;

    console.log('Original Time:', ogTime);
    console.log('Converted Time:', currentTime);
    console.log('Current Date:', formattedDate);


    const reservations = await Reservation.find({
      date: formattedDate,
      timeIn: currentTime,
    }).lean();

    const usernames = reservations.map(reservation => reservation.username); // Extract usernames from reservations

    const users = await User.find({ username: { $in: usernames } }).lean(); // Fetch users based on extracted usernames

    // Combine user data with reservation data into a single array
    const combinedData = reservations.map(reservation => {
      const user = users.find(user => user.username === reservation.username);
      return {
        ...reservation,
        fName: user ? user.fName : '',
        lName: user ? user.lName : '',
      };
    });

    const CurrentUsername = req.session.username;

    res.render('remove', { data: combinedData, CurrentUsername });
  } else {
    res.status(403).send(showError(403, 'You need to be logged in to place reservations.'));
  }
});

router.get('/about', async (req, res) => {
  if (req.session.username) {
    const username = req.session.username;

    const CurrentUser = req.session.username;
    const CheckUser = await User.findOne({ username: CurrentUser });
    var technician = CheckUser.technician; 
    res.render('about', {username, technician});
  } else {
    res.status(403).send(showError(403, 'You need to be logged in to view other profiles.'));
  }
});

// -------------------  POST FUNCTIONS  -------------------

// POST route for processing the login form data
router.post('/login', loginController);

// POST routes for processing the registration form data
router.post('/register_student', registerStudentController);
router.post('/register_technician', registerTechnicianController);

// POST route for processing the profile page data
router.post('/profile', authHandler, profileController);

// POST route for processing the reserve data
router.post('/reserve', authHandler, reserveController);

// POST route for processing the seat reservation
router.post('/edit', authHandler, editController);

// POST route for processing the seat reservation
router.post('/seat_selection', authHandler, seatsController.getUser);

// Route to validate username (during registration)
router.post('/register_check', (req, res, next) => {
  if (req.session.username) {
    res.status(403).send(showError(403, 'Access denied.'));
  } else {
    next();
  }
}, async (req, res) => {
  const { value } = req.body;

  // Check if username already exists in the database
  const result = await User.findOne({ username: value });

  // Evaluate results
  if (result) {
    return res.status(400).json({ success: false, message: 'Username is already taken' });
  } else {
    return res.json({ success: true });
  }
});

// Route to update the seatNum of the latest reservation
router.post('/update_latest_reservation', authHandler, async (req, res) => {
  try {
    // Fetch the latest reservation from the database
    const latestReservation = await Reservation.findOne({ seatNum: -1 }).sort({ _id: -1 });

    if (!latestReservation) {
      return res.status(404).json({ success: false, message: 'No reservations found.' });
    }

    // Update the seatNum of the latest reservation with the selected seat number
    latestReservation.seatNum = req.body.seatNum;
    await latestReservation.save();

    return res.json({ success: true, message: 'Reservation has been successfully updated.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while updating reservation data.' });
  }
});

// Route to remove reservations
router.post('/remove', authHandler, async (req, res) => {
  const reservationsToDelete = req.body.reservationsToDelete; // Array of reservation IDs to delete

  try {
    // Check if at least one reservation is selected for removal
    if (!reservationsToDelete || reservationsToDelete.length === 0) {
      return res.send('Please select at least one reservation to remove.');
    }

    // Delete selected reservations from the database
    await Reservation.deleteMany({ _id: { $in: reservationsToDelete } });

    // Redirect back to the /remove route to refresh the page
    res.redirect('/remove');
  } catch (err) {
    console.error(err);
    res.status(500).send('A server error occurred.');
  }
});

// Route to update profile pic
router.post('/profile/update_ppic', authHandler, async (req, res) => {
  const { newPic } = req.body;

  try {
    // Update account from database using username
    await User.updateOne({ username: req.session.username }, { $set:  {"pic": newPic} });
    return res.json({ success: true, message: 'Profile picture has been successfully updated.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while updating profile picture.' });
  }
});

// Route to update profile bio
router.post('/profile/update_pbio', authHandler, async (req, res) => {
  const { newBio } = req.body;

  try {
    // Update account from database using username
    await User.updateOne({ username: req.session.username }, { $set: {"bio": newBio} });
    return res.json({ success: true, message: 'Profile bio has been successfully updated.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while updating profile bio.' });
  }
});

// Route to delete an account
router.post('/profile/delete_acc', authHandler, async (req, res) => {
  try {
    // Delete account from database using username
    await User.deleteOne({ username: req.session.username });

    // Store req.session.username in a temp variable for display purposes when the function returns
    const uname = req.session.username;

    // Reset req.session.username
    req.session.username = '';

    return res.json({ success: true, message: `Account "${uname}" has been successfully deleted.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while deleting account.' });
  }
});

// Route to logout
router.post('/logout', authHandler, async (req, res) => {
  try {
    // Store req.session.username in a temp variable for display purposes when the function returns
    const uname = req.session.username;

    // Reset req.session.username
    req.session.username = '';

    return res.json({ success: true, message: `Account "${uname}" has been successfully logged out.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while logging out.' });
  }
});

router.delete('/delete-reservations', seatsController.deleteReservations);

// Export the router to be used in `app.js`
module.exports = router; 
