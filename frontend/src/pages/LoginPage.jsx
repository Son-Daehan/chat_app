import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/reducers/AuthSlice";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const dispatch = useDispatch();
	const loginUser = () => {
		console.log(username, password);
		dispatch(signIn({ username, password }));
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
