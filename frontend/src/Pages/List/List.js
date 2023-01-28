import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase
import { firebaseAuth } from "../../utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import ContentCard from "../../components/ContentCard/ContentCard";

const List = () => {
	const navigate = useNavigate();
	const [content, setContent] = useState([]);
	const [email, setEmail] = useState(undefined);

	onAuthStateChanged(firebaseAuth, (currentUser) => {
		if (currentUser) setEmail(currentUser.email);
		else navigate("/login");
	});

	const fetchUsersLikedContent = async () => {
		const { data } = await axios.get(
			`http://localhost:3001/api/user/liked/${email}`
		);
		setContent(data.content);
	};

	useEffect(() => {
		if (email) {
			fetchUsersLikedContent(email);
		}
	}, [email]);

	return (
		<div className="container">
			<span className="page-title">List</span>

			<div className="content">
				{content.length ? (
					content.map((c) => (
						<ContentCard
							key={c.id}
							id={c.id}
							title={c.title || c.name}
							poster={c.poster_path}
							date={c.release_date || c.first_air_date}
							media_type={c.media_type}
							vote_rating={c.vote_average}
						/>
					))
				) : (
					<h3>No movies/TV shows in list.</h3>
				)}
			</div>
		</div>
	);
};

export default List;
