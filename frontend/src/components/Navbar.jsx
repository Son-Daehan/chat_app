import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../redux/reducers/AuthSlice";

const Navbar = () => {
	// const logout = async () => {
	// 	await axios.post("/account/log_out/");
	// };
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleLogout = async () => {
		const response = await axios.post("/api/accounts/logout/");
		console.log(response.data);
		dispatch(signOut());
		navigate("/login");
	};

	return (
		<nav className="navbar-container">
			<ul className="nav-links-container">
				<div onClick={handleLogout}>Logout</div>
			</ul>
		</nav>
	);
};

export default Navbar;
