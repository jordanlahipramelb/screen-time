import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Auth.scss";
// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase-config";
import { UserAuth } from "../../context/AuthContext";

const SignUp = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const { signUp } = UserAuth();

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
		try {
			await signUp(formData.email, formData.password);
			navigate("/trending");
		} catch (error) {
			console.log(error);
		}
		console.log(formData);
	};

	onAuthStateChanged(firebaseAuth, (currentUser) => {
		if (currentUser) navigate("/trending");
	});

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
					<Button onClick={handleSubmit}>Sign Up</Button>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
