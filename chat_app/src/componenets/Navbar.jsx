import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ authenticated }) => {
	const logout = async () => {
		await axios.post("/api/log_out").then((response) => console.log(response));
	};

	return (
		<nav className="navbar-container">
			<ul className="nav-links-container">
				<Link to="/">Home</Link>
				<Link to="/chat/">Chat</Link>
				{/* <Link to="/register/">Register</Link> */}
				<Link to="/profile/">Profile</Link>
				{!authenticated ? (
					<>
						<Link to="/login/">Login</Link>
						<Link to="/register/">Register</Link>
					</>
				) : (
					""
				)}
				<Link onClick={logout} to="/">
					Logout
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
