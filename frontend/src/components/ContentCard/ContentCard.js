import React from "react";
import { img_300 } from "../../config/config";
import unavailablePoster from "../../assets/portrait-unavailable.jpg";
import "./ContentCard.scss";
import { Badge } from "@mui/material";
import ContentModal from "../ContentModal/ContentModal";

const ContentCard = ({ id, title, poster, date, media_type, vote_rating }) => {
	return (
		<ContentModal media_type={media_type} id={id}>
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
