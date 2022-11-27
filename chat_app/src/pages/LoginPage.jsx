import axios from "axios";
import React from "react";
import { useState } from "react";

const LoginPage = ({ setAuthenticated }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const loginUser = async () => {
		const data = {
			username: username,
			password: password,
		};

		await axios
			.post("/api/log_in", data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				// console.log(response);
				if (response.data === "Authorized") {
					setAuthenticated(true);
				} else {
					setAuthenticated(false);
				}
			});
	};

	return (
		<div>
			<input
				type="text"
				placeholder="username"
				onChange={(event) => setUsername(event.target.value)}
			/>
			<input
				type="password"
				placeholder="password"
				onChange={(event) => setPassword(event.target.value)}
			/>
			<button onClick={loginUser}>login</button>
		</div>
	);
};

export default LoginPage;
