import React from "react";
import { Pagination } from "@mui/material";
import "./CustomPagination.scss";

const CustomPagination = ({ setPageNum, numOfPages = 10 }) => {
	// sets pageNum state and returns page to the top of screen
	const handlePageChange = (pageNum) => {
		setPageNum(pageNum);
		window.scrollTo(0, 0);
	};
	return (
		<div className="custom-pagination">
			<Pagination
				count={numOfPages}
				onChange={(e) => handlePageChange(e.target.textContent)}
				hideNextButton
				hidePrevButton
			/>
		</div>
	);
};

export default CustomPagination;
