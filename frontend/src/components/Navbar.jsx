import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../redux/reducers/AuthSlice";
import { AiOutlineLogout } from "react-icons/ai";

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
			<hr />
			<ul className="nav-links-container">
				<div
					onClick={handleLogout}
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-end",
						paddingRight: "10px",
					}}
				>
					<AiOutlineLogout
						style={{
							height: "35px",
							width: "35px",
							cursor: "pointer",
						}}
					></AiOutlineLogout>
				</div>
			</ul>
		</nav>
	);
};

export default Navbar;
