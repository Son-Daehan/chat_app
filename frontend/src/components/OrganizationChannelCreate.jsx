import React from "react";
import axios from "axios";
import { useState } from "react";

const OrganizationChannelCreate = ({ selectedOrganizationID }) => {
	const [inputChannelName, setInputChannelName] = useState(null);
	const [inputChannelPrivacy, setInputChannelPrivacy] = useState(false);

	const handleCreateOrganizationChannel = async () => {
		const data = {
			channelName: inputChannelName,
			channelPrivacy: inputChannelPrivacy,
		};

		const response = await axios.post(
			`/api/organization/channel/${selectedOrganizationID}/`,
			data
		);
	};

	return (
		<div>
			<input onChange={(event) => setInputChannelName(event.target.value)} />
			<button onClick={handleCreateOrganizationChannel}>
				Add a new channel to org
			</button>
		</div>
	);
};

export default OrganizationChannelCreate;
