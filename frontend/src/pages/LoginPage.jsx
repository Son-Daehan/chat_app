import axios from "axios";
import React from "react";
import { useState } from "react";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const loginUser = async () => {
		const data = {
			username: username,
			password: password,
		};

		const response = await axios.post("/account/log_in/", data);
		console.log(response);

		if (response.data["login"] == true) {
			window.location.reload();
		} else {
			setError("There is a login issue");
		}
		if (response.data.user == false) {
			setError("This email is not valid");
		}
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
			<div>{error}</div>
		</div>
	);
};

export default LoginPage;
