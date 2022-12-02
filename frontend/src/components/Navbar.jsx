import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	const logout = async () => {
		await axios.post("/account/log_out/");
	};

	return (
		<nav className="navbar-container">
			<ul className="nav-links-container">
				<Link to="/">Home</Link>
				<Link to="/chat">Chat</Link>
				{/* <Link to="/register/">Register</Link> */}
				<Link to="/account/profile">Profile</Link>
				{/* {!authenticated ? ( */}
				{/* <> */}
				<Link to="/account/login">Login</Link>
				<Link to="/account/register">Register</Link>
				{/* </> */}
				{/* ) : ( */}
				{/* "" */}
				{/* )} */}
				<Link onClick={logout} to="/">
					Logout
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
