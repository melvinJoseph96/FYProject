const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isMP: {
    type: Boolean,
    required: false
  }
  ,
  isAvailable: {
    type: Boolean,
    required: false
  },
  details: {
    type: Object,
    required: false
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
