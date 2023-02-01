import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { img_500 } from "../../config/config";
import unavailable from "../../assets/portrait-unavailable.jpg";
import unavailableLandscape from "../../assets/landscape-unavailable.jpg";
import axios from "axios";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./ContentModal.scss";
import { Stack } from "@mui/system";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Firebase
import { firebaseAuth } from "../../utils/firebase-config";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "80%",
	height: "70%",
	backgroundColor: "#3b3b3b ",
	border: "1px solid #282c34",
	borderRadius: 2,
	color: "white",
	boxShadow: 24,
	p: 4,
};

function ContentModal({
	children,
	media_type,
	contentId,
	// title,
	// poster,
	// date,
	// vote_rating,
	// email,
}) {
	const [open, setOpen] = React.useState(false);
	const [content, setContent] = useState();
	const [video, setVideo] = useState();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const navigate = useNavigate();

	const { user } = UserAuth();

	const showAddMsg = () => {
		toast.success("Movie Added!");
	};

	/** Fetch data of single content
	 * media_type: tv or movie
	 * id: id of content
	 */
	const fetchSingleData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${contentId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);

		setContent(data);
	};

	const fetchVideo = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/${media_type}/${contentId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);

		setVideo(data.results[0]?.key);
	};

	// const addToList = async () => {
	// 	try {
	// 		console.log("trying to add movie", {
	// 			email,
	// 			data: { contentId, media_type, title, poster, date, vote_rating },
	// 		});
	// 		// retrieve email in order to match email in users DB
	// 		await axios.post("http://localhost:3001/api/user/add", {
	// 			email,
	// 			data: { contentId, media_type, title, poster, date, vote_rating },
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	useEffect(() => {
		fetchSingleData();
		fetchVideo();
	}, []);

	return (
		<>
			<div onClick={handleOpen} className="content-card">
				{children}
			</div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					{content && (
						<Box sx={style}>
							<div className="content-modal">
								<img
									src={
										content.poster_path
											? `${img_500}/${content.poster_path}`
											: unavailable
									}
									alt={content.name || content.title}
									className="portrait"
								/>
								<img
									src={
										content.backdrop_path
											? `${img_500}/${content.backdrop_path}`
											: unavailableLandscape
									}
									alt={content.name || content.title}
									className="landscape"
								/>

								<div className="about">
									<div className="top-about">
										<span className="title">
											{content.name || content.title} (
											{(
												content.first_air_date ||
												content.release_date ||
												"-----"
											).substring(0, 4)}
											)
										</span>
										{content.tagline && (
											<i className="tagline">{content.tagline}</i>
										)}
									</div>

									<span className="description">{content.overview}</span>

									<Stack spacing={2}>
										<Button
											className="btn"
											variant="contained"
											startIcon={<YouTubeIcon />}
											color="primary"
											target="__blank"
											href={`https://www.youtube.com/watch?v=${video}`}
										>
											Watch the Trailer
										</Button>
										{/* {user ? (
											<>
												<Button
													variant="contained"
													color="primary"
													className="btn"
													onClick={() => {
														showAddMsg();
														addToList();
													}}
												>
													Add To List
												</Button>
												<ToastContainer
													position="top-center"
													autoClose={1000}
													hideProgressBar={false}
													newestOnTop
													closeOnClick
													rtl={false}
													pauseOnFocusLoss
													draggable
													pauseOnHover
													theme="colored"
												/>
											</>
										) : null} */}
									</Stack>
								</div>
							</div>
						</Box>
					)}
				</Fade>
			</Modal>
		</>
	);
}

export default ContentModal;
