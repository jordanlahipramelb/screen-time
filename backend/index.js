/** Express App for Screen Time */

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/UserRoutes");

app.use(cors());
app.use(express.json());

mongoose
	.connect("mongodb://localhost:27017/movies-app", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("DB Connected");
	})
	.catch((err) => {
		console.log(err.message);
	});

app.use("/api/user", userRoutes);

app.listen(3001, () => {
	console.log("Server started on port 3001");
});
