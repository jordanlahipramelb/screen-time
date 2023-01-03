import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Auth.scss";

const SignUp = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	/** Updates form field when typing */

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((data) => ({
			...data,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
	};

	return (
		<div className="auth-page">
			<div className="body">
				<div className="title">
					<h3>Sign Up</h3>
				</div>

				<form onSubmit={handleSubmit}>
					<Stack spacing={1}>
						<TextField
							label="Email Address"
							variant="filled"
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>

						<TextField
							label="Password"
							variant="filled"
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
						/>
					</Stack>
					<Button>Log In</Button>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
