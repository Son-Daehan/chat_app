import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/reducers/AuthSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { loading, error, success, userInfo } = useSelector(
		(state) => state.user
	);

	axios.defaults.xsrfCookieName = "csrftoken";
	axios.defaults.xsrfHeaderName = "X-CSRFToken";

	const dispatch = useDispatch();
	const createUser = () => {
		dispatch(signUp({ firstName, lastName, email, password }));
	};

	const navigate = useNavigate();

	useEffect(() => {
		// redirect authenticated user to profile screen
		if (userInfo) {
			navigate("/account/profile");
		}
		// redirect user to login page if registration was successful
		if (success) {
			navigate("/account/login");
		}
	}, [navigate, userInfo, success]);

	return (
		<div>
			<input
				type="text"
				placeholder="first name"
				onChange={(event) => setFirstName(event.target.value)}
			/>
			<input
				type="text"
				placeholder="last name"
				onChange={(event) => setLastName(event.target.value)}
			/>
			<input
				type="email"
				placeholder="email"
				onChange={(event) => setEmail(event.target.value)}
			/>
			<input
				type="password"
				placeholder="password"
				onChange={(event) => setPassword(event.target.value)}
			/>
			<button onClick={createUser} disabled={loading}>
				create a user
			</button>
			{error && <div>{error}</div>}
		</div>
	);
};

export default RegisterPage;
