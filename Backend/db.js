const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb+srv://vicky:vicky@cluster0.vodazbe.mongodb.net/seatBooking?retryWrites=true&w=majority");

module.exports = {connection};