const mongoose = require('mongoose');
const User = require("./userModel");
const Pet = require("./petModel");

const favoriteAnimalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true,
  }],
  // You can add additional fields specific to the favorite relationship if needed
});

const FavoriteAnimal = mongoose.model('FavoriteAnimal', favoriteAnimalSchema);

module.exports = FavoriteAnimal;
