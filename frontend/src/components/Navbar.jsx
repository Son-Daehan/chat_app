import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../redux/reducers/AuthSlice";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUsersCog } from "react-icons/fa";
import { useEffect } from "react";

const Navbar = () => {
	const { organizationUsers } = useSelector((state) => state.organization);

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
			<div className="nav-links-container">
				<div
					style={{
						cursor: "pointer",
						width: "100px",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						gap: "20px",
						alignItems: "center",
						fontSize: "18px",
						borderStyle: "solid",
						borderWidth: "1px",
						padding: "5px",
						borderRadius: "5px",
						borderColor: "beige",
					}}
				>
					{organizationUsers ? organizationUsers.length : ""}
					<FaUsersCog style={{ height: "35px", width: "35px" }} />
				</div>
				<div
					onClick={handleLogout}
					style={{
						cursor: "pointer",
						width: "70px",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						borderStyle: "solid",
						borderWidth: "1px",
						borderRadius: "5px",
						borderColor: "beige",
					}}
				>
					<AiOutlineLogout
						style={{
							height: "35px",
							width: "35px",
						}}
					/>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
