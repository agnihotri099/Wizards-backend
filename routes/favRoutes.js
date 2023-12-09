const express = require("express");
const router = express.Router();
const {
  getAllFavorites,
  addFavorite,
  removeFavorite,
} = require("../controller/favController");

// Route to get all favorite animals for a user
router.get("/:userId", getAllFavorites);

// Route to add a new favorite animal for a user
router.post("/add", addFavorite);

// Route to unfavorite an animal for a user
router.post("/remove", removeFavorite);

module.exports = router;
