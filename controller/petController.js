const Pet = require('../models/petModel');

const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getSinglePet = async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports={getAllPets,getSinglePet};