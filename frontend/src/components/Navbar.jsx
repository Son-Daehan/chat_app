import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "../redux/reducers/AuthSlice";

const Navbar = () => {
	// const logout = async () => {
	// 	await axios.post("/account/log_out/");
	// };

	const dispatch = useDispatch();

	const logout = async () => {
		const response = await axios.post("/api/account/log_out/");
		console.log(response.data);
		dispatch(signOut());
	};

	return (
		<nav className="navbar-container">
			<ul className="nav-links-container">
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
				<Link onClick={logout} to="/">
					Logout
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
