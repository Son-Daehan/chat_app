import axios from "axios";
import React, { useState } from "react";

const RegisterPage = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	axios.defaults.xsrfCookieName = "csrftoken";
	axios.defaults.xsrfHeaderName = "X-CSRFToken";

	const createUser = async (event) => {
		event.preventDefault();

		const data = {
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: password,
		};
		console.log(data);
		await axios.post("/account/register/", data);

		console.log(data);
	};

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
			<button onClick={createUser}>create a user</button>
		</div>
	);
};

export default RegisterPage;
