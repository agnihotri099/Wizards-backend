const express = require('express');
const router = express.Router();
const {getAllPets} = require('../controller/petController');
const {getSinglePet}=require('../controller/petController');

// Route to get all pets
router.get('/',getAllPets);
// Route to get a single pet by ID
router.get('/:id', getSinglePet);


module.exports = router;
