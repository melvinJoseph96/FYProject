const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  jobTitle: {
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
  qualifications: {
    type: String,
    default: true
  }
});

const medical_Professional = mongoose.model('medical_Professional', UserSchema);

module.exports = medical_Professional;
