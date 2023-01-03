import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import ContentCard from "../../components/ContentCard/ContentCard";

const Trending = () => {
	const [content, setContent] = useState([]);
	const [pageNum, setPageNum] = useState(1);

	const fetchTrending = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNum}`
		);
		console.log(data.results);
		setContent(data.results);
	};

	useEffect(() => {
		window.scroll(0, 0);
		fetchTrending();

		// eslint-disable-next-line
	}, [pageNum]);

	return (
		<div className="container">
			<span className="page-title">Trending</span>
			<div className="content">
				{content &&
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
					))}
			</div>

			<CustomPagination setPageNum={setPageNum} />
		</div>
	);
};

export default Trending;
