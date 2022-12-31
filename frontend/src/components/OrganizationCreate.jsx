import { useState } from "react";
import axios from "axios";

const OrganizationCreate = () => {
	const [inputOrganizationName, setInputOrganizationName] = useState(null);

	const handleCreateOrganization = async () => {
		const data = {
			organizationName: inputOrganizationName,
		};

		const response = await axios.post("/api/organization/", data);

		console.log(response);
	};

	return (
		<div>
			<div>Create Organization</div>
			<input
				onChange={(event) => setInputOrganizationName(event.target.value)}
			/>
			<button onClick={handleCreateOrganization}>Create Organization</button>
		</div>
	);
};

export default OrganizationCreate;
