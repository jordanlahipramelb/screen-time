import { Button, Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Search.scss";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import ContentCard from "../../components/ContentCard/ContentCard";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Search = () => {
	const [type, setType] = useState(0);
	const [searchText, setSearchText] = useState("");
	const [pageNum, setPageNum] = useState(1);
	const [content, setContent] = useState([]);
	const [numOfPages, setNumOfPages] = useState();

	const fetchSearch = async () => {
		// tabs are 0 and 1
		// if type is "1" or "true", it's tv, otherwise it's movie
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
				process.env.REACT_APP_API_KEY
			}&query=${searchText}&page=${pageNum}`
		);

		setContent(data.results);
		setNumOfPages(data.total_pages);

		console.log(data.results);
	};

	useEffect(() => {
		window.scroll(0, 0);
		fetchSearch();
		// eslint-disable-next-line
	}, [type, pageNum]);

	return (
		<div className="search-page container">
			<div className="search-field">
				<TextField
					style={{ flex: 1 }}
					className="search"
					label="Search"
					variant="filled"
					onChange={(e) => setSearchText(e.target.value)}
					onClick={fetchSearch}
				/>
				<Button
					variant="contained"
					style={{ marginLeft: 10 }}
					onClick={fetchSearch}
				>
					<SearchIcon />
				</Button>
			</div>
			<div className="tabs">
				<Tabs
					value={type}
					indicatorColor="primary"
					onChange={(event, newValue) => {
						setType(newValue);
						setPageNum(1);
					}}
					style={{ paddingBottom: 5 }}
				>
					<Tab style={{ width: "50%" }} label="Search Movies" />
					<Tab style={{ width: "50%" }} label="Search TV Series" />
				</Tabs>
			</div>

			<div className="content">
				{content &&
					content.map((c) => (
						<ContentCard
							key={c.id}
							id={c.id}
							title={c.title || c.name}
							poster={c.poster_path}
							date={c.release_date || c.first_air_date}
							media_type={type ? "tv" : "movie"}
							vote_rating={c.vote_average}
						/>
					))}

				{searchText &&
					!content &&
					(type ? <h2>No TV Series Found</h2> : <h2>No Movies Found</h2>)}
			</div>

			{numOfPages > 1 && (
				<CustomPagination setPageNum={setPageNum} numOfPages={numOfPages} />
			)}
		</div>
	);
};

export default Search;
