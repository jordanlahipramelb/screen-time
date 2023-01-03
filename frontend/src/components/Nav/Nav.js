import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import "./Nav.scss";
import React, { useEffect, useState } from "react";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SearchIcon from "@mui/icons-material/Search";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
	const [value, setValue] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		if (value === 0) navigate("/trending");
		if (value === 1) navigate("/movies");
		if (value === 2) navigate("/tvshows");
		if (value === 3) navigate("/list");
		if (value === 4) navigate("/search");
	}, [value, navigate]);

	return (
		<BottomNavigation
			showLabels
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
		>
			<BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />
			<BottomNavigationAction label="Movies" icon={<MovieIcon />} />
			<BottomNavigationAction label="TV" icon={<TvIcon />} />
			<BottomNavigationAction label="Saved" icon={<FavoriteIcon />} />
			<BottomNavigationAction label="Search" icon={<SearchIcon />} />
		</BottomNavigation>
	);
};

export default BottomNav;
