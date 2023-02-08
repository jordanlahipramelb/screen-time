import React, { useState } from "react";
import { img_300 } from "../../config/config";
import unavailablePoster from "../../assets/portrait-unavailable.jpg";
import "./ContentCard.scss";
import { Badge } from "@mui/material";
import ContentModal from "../ContentModal/ContentModal";
import { UserAuth } from "../../context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { firebaseAuth } from "../../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const ContentCard = ({ id, title, poster, date, media_type, vote_rating }) => {
	const [email, setEmail] = useState(undefined);
	const { user } = UserAuth();
	const navigate = useNavigate();

	// onAuthStateChanged(firebaseAuth, (currentUser) => {
	// 	if (currentUser) {
	// 		setEmail(currentUser.email);
	// 	} else navigate("/login");
	// });

	const removeFromList = async () => {
		try {
			await axios.put("http://localhost:3001/api/user/remove", {
				email,
				id,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const addToList = async () => {
		try {
			console.log("trying to add movie", {
				email,
				data: { id, media_type, title, poster, date, vote_rating },
			});
			// retrieve email in order to match email in users DB
			await axios.post("http://localhost:3001/api/user/add", {
				email,
				data: { id, media_type, title, poster, date, vote_rating },
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ContentModal
			email={email}
			media_type={media_type}
			contentId={id}
			title={title}
			poster={poster}
			date={date}
			vote_rating={vote_rating}
		>
			<Badge
				badgeContent={vote_rating.toString().slice(0, 3)}
				color={vote_rating > 6 ? "primary" : "secondary"}
			/>
			<img
				className="poster"
				alt={`${title} poster`}
				src={poster ? `${img_300}/${poster}` : unavailablePoster}
			/>
			<p className="title">{title}</p>
		</ContentModal>
	);
};

export default ContentCard;
