const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  is_valid: {
    type: Boolean
    
  },
  online: {
    type: Boolean
    
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Participant", participantSchema);
