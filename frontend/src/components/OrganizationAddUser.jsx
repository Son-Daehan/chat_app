import axios from "axios";
import React from "react";
import { useState } from "react";

const OrganizationAddUser = ({ selectedOrganizationID }) => {
	const [inputUsername, setInputUsername] = useState(null);

	const handleAddUserToOrganization = async () => {
		const data = {
			organizationID: selectedOrganizationID,
			username: inputUsername,
		};

		const response = await axios.post("/api/organization/add_user/", data);
	};

	return (
		<div>
			<input onChange={(event) => setInputUsername(event.target.value)} />
			<button onClick={handleAddUserToOrganization}>Add User To Org</button>
		</div>
	);
};

export default OrganizationAddUser;
