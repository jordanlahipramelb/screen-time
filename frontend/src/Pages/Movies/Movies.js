import axios from "axios";
import React, { useEffect, useState } from "react";
// import Genres from "../../components/Genres/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import ContentCard from "../../components/ContentCard/ContentCard";

const Movies = () => {
	const [content, setContent] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [numOfPages, setNumOfPages] = useState();

	const fetchMovies = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`
		);
		setContent(data.results);
		setNumOfPages(data.total_pages);

		console.log(data);
	};

	useEffect(() => {
		window.scroll(0, 0);
		fetchMovies();
		// eslint-disable-next-line
	}, [pageNum]);

	return (
		<div className="container">
			<span className="page-title">Movies</span>

			<div className="content">
				{content &&
					content.map((c) => (
						<ContentCard
							key={c.id}
							id={c.id}
							title={c.title || c.name}
							poster={c.poster_path}
							date={c.release_date || c.first_air_date}
							media_type={"movie"} // ! doing this keeps crashing the page when a card it clicked
							vote_rating={c.vote_average}
						/>
					))}
			</div>

			{numOfPages > 1 && (
				<CustomPagination setPageNum={setPageNum} numOfPages={numOfPages} />
			)}
		</div>
	);
};

export default Movies;
