const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  row: Number,
  seat: Number,
  isBooked: Boolean,
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
