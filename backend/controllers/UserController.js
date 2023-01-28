const User = require("../models/UserModel");

class UserController {
	static async fetchLikedMovies(req, res) {
		try {
			const { email } = req.params;
			// console.log(email);
			const user = await User.findOne({ email });
			if (user) {
				return res.json({ msg: "success", content: user.likedMovies });
			} else return res.json(`User with email ${email} not found.`);
		} catch (error) {
			return res.json({ msg: "Error fetching movies." });
		}
	}

	static async addToLikedMovies(req, res) {
		try {
			const { email, data } = req.body;

			const user = await User.findOne({ email });

			// If user exists, add movie to their list
			if (user) {
				const { likedMovies } = user;

				// Find if the movie is already liked
				const alreadyLiked = likedMovies.find(({ id }) => id === data.id);

				// If movies not liked, find the user and spread its previous movies/add new movie
				if (!alreadyLiked) {
					await User.findByIdAndUpdate(
						user._id,
						{
							likedMovies: [...user.likedMovies, data],
						},
						{ new: true }
					);
				} else return res.json({ msg: `Movie already exists in list.` });
			}
			// If user does not exist in DB, create the User and add the movie to their list
			else await User.create({ email, likedMovies: [data] });

			return res.json({ msg: "Movie successfully added to list." });
		} catch (err) {
			return res.json({ msg: `Error adding movie to list.` });
		}
	}

	static async removeFromLikedMovies(req, res) {
		try {
			const { email, contentId } = req.body;
			const user = await User.findOne({ email });

			if (user) {
				const movies = user.likedMovies;

				// Find index of movie in likedList in order to remove it
				const movieIdx = movies.findIndex(({ id }) => id === contentId);

				if (!movieIdx) {
					res.status(400).send({ msg: "Movie not found." });
				}

				// remove movie from liked movies
				movies.splice(movieIdx, 1);

				// update User table with new likedMovies data
				await User.findByIdAndUpdate(
					user._id,
					{
						likedMovies: movies,
					},
					{ new: true }
				);

				return res.json({
					msg: "Movie removed from list.",
					movies,
				});
			} else return res.json({ msg: "User with given email not found." });
		} catch (error) {
			console.log(error);
			return res.json({ msg: "Error removing movie from liked list" });
		}
	}
}

module.exports = UserController;
