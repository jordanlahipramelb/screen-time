import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container } from "@mui/material";
import { Stack } from "@mui/system";

const Login = () => {
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
		// setError("");
		// try {
		// 	await logIn(formData.email, formData.password);
		// 	navigate("/");
		// } catch (error) {
		// 	console.log(error);
		// 	alert(error);
		// 	setError(error.message);
		// }
	};

	return (
		<div className="auth-page">
			<div className="body">
				<div className="title">
					<h3>Log In</h3>
					<small>Welcome back!</small>
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

export default Login;
