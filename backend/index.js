/** Express App for Screen Time */

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require("./routes/UserRoutes");

app.use(cors());
app.use(express.json());
dotenv.config();

const connect = () => {
	mongoose
		.connect(process.env.MONGO)
		.then(() => {
			console.log("Connected to DB");
		})
		.catch((err) => {
			console.log(err.message);
		});
};

// mongoose
// 	.connect("mongodb://localhost:27017/screen-time", {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => {
// 		console.log("DB Connected");
// 	})
// 	.catch((err) => {
// 		console.log(err.message);
// 	});

app.use("/api/user", userRoutes);

app.listen(3001, () => {
	connect();
	console.log("Server started on port 3001");
});
