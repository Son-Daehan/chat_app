import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/reducers/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { userInfo, hydrate, error } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const loginUser = () => {
		console.log(username, password);
		dispatch(signIn({ username, password }));
	};

	const navigate = useNavigate();

	useEffect(() => {
		// redirect authenticated user to profile screen
		if (userInfo) {
			navigate("/account/profile");
		}
	}, [navigate, userInfo]);

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
			{error && <div>{error}</div>}
		</div>
	);
};

export default LoginPage;
