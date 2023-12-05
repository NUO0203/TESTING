const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default: 'images/profile-icon.jpg',
  },
  bio: {
    type: String,
    required: false,
  },
  technician: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
