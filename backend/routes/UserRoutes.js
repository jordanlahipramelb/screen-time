const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.get("/liked/:email", UserController.fetchLikedMovies);
router.post("/add", UserController.addToLikedMovies);
router.put("/remove", UserController.removeFromLikedMovies);

module.exports = router;
