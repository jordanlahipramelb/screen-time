import React, { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Stack } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
	const [nav, setNav] = useState(false);
	const handleClick = () => setNav(!nav); // sets nav true<>false

	return (
		<div className="header" onClick={() => window.scroll(0, 0)}>
			<div className="left">
				<Link to="/">
					<span className="logo">SCREEN TIME</span>
					<span className="logo-mobile">ST</span>
				</Link>

				{/* Menu */}
				<Stack className="menu mobile-none" direction="row" spacing={2}>
					<Link to="/trending">Trending</Link>

					<Link to="/movies">Movies</Link>

					<Link to="/tvshows">TV</Link>

					<Link to="/search">Search</Link>

					<Link to="/mylist">My List</Link>
				</Stack>
			</div>

			<div className="right">
				<Link to="/login" className="signin-btn">
					Log In
				</Link>
				<Link to="/signup" className="signup-btn">
					Sign Up
				</Link>
			</div>

			{/* Hamburger */}
			<div onClick={handleClick} className="hamburger d-md-none">
				{!nav ? <MenuIcon /> : <CloseIcon />}
			</div>

			{/* Mobile Menu */}
			<Stack className={!nav ? "d-none" : "mobile-menu"} spacing={10}>
				<Link to="/trending" onClick={handleClick}>
					Trending
				</Link>

				<Link to="/movies" onClick={handleClick}>
					Movies
				</Link>

				<Link to="/tvshows" onClick={handleClick}>
					TV
				</Link>

				<Link to="/search" onClick={handleClick}>
					Search
				</Link>

				<Link to="/mylist" onClick={handleClick}>
					My List
				</Link>
			</Stack>
		</div>
	);
};

export default Header;
