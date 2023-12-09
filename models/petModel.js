const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // Assuming you want to store the image URL or path
    required: true,
  },
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
