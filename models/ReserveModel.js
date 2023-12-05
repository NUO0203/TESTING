const mongoose = require('mongoose');


const ReservationSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    }, 
    date: {
      type: String,
      required: true,
    },
    timeIn: { // Ensure the field name is 'username'
      type: String,
      required: true,
    },
    timeOut: {
      type: String,
      required: true,
    },
     seatNum: {
        type: Number,
        required: true,
    },
    labNum: {
      type: Number,
      required: true,
    },
    anonymous: {
      type: Number,
      default: 0,

    },
    
  });

  module.exports = mongoose.model('Reservation', ReservationSchema);
