import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import ContentCard from "../../components/ContentCard/ContentCard";

const TV = () => {
	const [content, setContent] = useState([]);
	const [pageNum, setPageNum] = useState(1);
	const [numOfPages, setNumOfPages] = useState();

	const fetchTV = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${pageNum}`
		);
		setContent(data.results);
		setNumOfPages(data.total_pages);
	};

	useEffect(() => {
		window.scroll(0, 0);
		fetchTV();

		// eslint-disable-next-line
	}, [pageNum]);

	return (
		<div className="container">
			<span className="page-title">TV Series</span>
			<div className="content">
				{content &&
					content.map((c) => (
						<ContentCard
							key={c.id}
							id={c.id}
							title={c.title || c.name}
							poster={c.poster_path}
							date={c.release_date || c.first_air_date}
							media_type="tv"
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

export default TV;
