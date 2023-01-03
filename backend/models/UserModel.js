/** User Model */

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		min: 1,
		max: 50,
	},

	// array of liked movies
	likedMovies: Array,
});

module.exports = mongoose.model("users", UserSchema);
