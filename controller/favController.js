const FavoriteAnimal = require("../models/favoriteAnimal");
const Pet = require("../models/petModel");
const User = require("../models/userModel");

// Controller method to get all favorite animals for a user
const getAllFavorites = async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log(userId);
      const userExist = await FavoriteAnimal.findOne({ user: userId });
  
      if (userExist) {
        await userExist.populate("pets");
  
        res.json(userExist);
      } else {
        res.json("not found");
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

// Controller method to add a new favorite animal for a user
const addFavorite = async (req, res) => {
  try {
    const { petId, userId } = req.body;

    // Check if the user and pet exist
    const userExists = await User.findById(userId);
    const petExists = await Pet.findById(petId);

    if (!userExists || !petExists) {
      return res.status(404).json({ error: "User or pet not found" });
    }

    // Check if the favorite already exists for the user
    const userFavorite = await FavoriteAnimal.findOne({ user: userId });

    if (userFavorite) {
      // If the user has favorites, update the existing record
      userFavorite.pets.push(petId);
      const updatedUserFavorites = await userFavorite.save();
      res.json(updatedUserFavorites);
    } else {
      // If there's no existing record, create a new one
      const favoriteAnimal = new FavoriteAnimal({
        user: userId,
        pets: [petId],
      });

      // Save the new favorite record
      const savedFavorite = await favoriteAnimal.save();
      res.json(savedFavorite);
    }
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    
    const { petId,userId } = req.body;

    // Check if the user and pet exist
    const userExists = await User.findById(userId);
    const petExists = await Pet.findById(petId);

    if (!userExists || !petExists) {
      return res.status(404).json({ error: "User or pet not found" });
    }

    // Update the favorite entry to remove the specified petId from the pets array
    const updatedFavorite = await FavoriteAnimal.findOneAndUpdate(
        { user: userId },
        { $pull: { pets: petId } },
        { new: true }
      );
  
      if (!updatedFavorite) {
        return res
          .status(404)
          .json({ error: "Favorite not found for this user and pet" });
      }
  
      res.json({ message: "Successfully removed favorite" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllFavorites,
  addFavorite,
  removeFavorite,
};
