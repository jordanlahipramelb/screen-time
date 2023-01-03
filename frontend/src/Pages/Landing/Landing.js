import React from "react";
import { Link } from "react-router-dom";
import "./Landing.scss";

const Landing = () => {
	return (
		<div className="landing-page">
			<div className="container">
				<div className="title">
					<h1>Welcome to Screen Time</h1>
				</div>
				<div>
					<p>Stay up to date with the latest movies and TV shows.</p>

					<div className="links">
						<Link to="/login" className="flat-button">
							Log In
						</Link>
						<Link to="/signup" className="flat-button">
							Sign Up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
