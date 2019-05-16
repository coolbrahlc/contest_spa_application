const mongoose = require('mongoose');

const message = new mongoose.Schema({
  sender: String,
  body: String,
  created_at: { type: Date, default: Date.now },
});

const room = new mongoose.Schema({
  participants: [Number],
  messages:  [message],
  created_at: Date,
  updated_at: { type: Date, default: Date.now },
});


//module.exports.User = mongoose.model('User', user);
module.exports.Room = mongoose.model('Room', room);
module.exports.Message = mongoose.model('Message', message);

