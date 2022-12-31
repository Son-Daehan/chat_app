import React, { useState } from "react";
import ChatFrame from "../components/ChatFrame";
import ChatChannelCreator from "../components/ChatChannelCreator";
import ChatChannel from "../components/ChatChannel";
import "./homepage.css";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import OrganizationCreate from "../components/OrganizationCreate";
import OrganizationAddUser from "../components/OrganizationAddUser";
import OrganizationChannelCreate from "../components/OrganizationChannelCreate";

const HomePage = () => {
	const [selectedChannel, setSelectedChannel] = useState(null);
	const [selectedChannelName, setSelectedChannelName] = useState([]);
	const [userChannels, setUserChannels] = useState([]);
	const [organizationChannels, setOrganizationChannels] = useState([]);
	const [organizations, setOrganizations] = useState([]);
	const [selectedOrganization, setSelectedOrganization] = useState(null);
	const [selectedOrganizationID, setSelectedOrganizationID] = useState(null);
	const [displayAllOrganizations, setDisplayAllOrganizations] = useState(false);
	const [displayOrganizationSettings, setDisplayOrganizationSettings] =
		useState(false);

	const handleRetrieveUserChannels = async () => {
		const response = await axios.get("/api/chat/user_channels/");
		const allUserChannels = response.data.channels;

		setUserChannels(allUserChannels);
	};

	const handleRetreiveUserOrganizations = async () => {
		const response = await axios.get("/api/organization/");

		const data = response.data.data;
		setOrganizations(data);
	};

	const handleRetrieveOrganizationChannels = async () => {
		const response = await axios.get(
			`/api/organization/channel/${selectedOrganizationID}/`
		);

		const allOrganizationChannels = response.data.data;

		setOrganizationChannels(allOrganizationChannels);

		console.log(allOrganizationChannels);
	};

	useEffect(() => {
		handleRetrieveUserChannels();
		handleRetreiveUserOrganizations();
		// console.log(selectedChannel);
	}, []);

	useEffect(() => {
		if (selectedOrganizationID) {
			handleRetrieveOrganizationChannels();
		}
	}, [selectedOrganizationID]);

	useEffect(() => {
		console.log(selectedOrganizationID);
	}, [selectedOrganizationID]);

	return (
		<div className="homepage-container">
			<div className="contacts-container">
				<Navbar />
				<div>
					<div
						onClick={() =>
							setDisplayAllOrganizations(displayAllOrganizations ? false : true)
						}
					>
						{selectedOrganization ? (
							<h1>{selectedOrganization.organization.organization_name}</h1>
						) : (
							<h1>Select an Organization</h1>
						)}
					</div>
					<div>
						{displayAllOrganizations &&
							organizations &&
							organizations.map((organization) => {
								return (
									<h3
										onClick={() => {
											setSelectedOrganization(organization);
											setSelectedOrganizationID(organization.organization.id);
											setDisplayAllOrganizations(false);
										}}
									>
										{organization.organization.organization_name}
									</h3>
								);
							})}
					</div>
					<div>
						<h5
							onClick={() =>
								setDisplayOrganizationSettings(
									displayOrganizationSettings ? false : true
								)
							}
						>
							Settings
						</h5>
					</div>
					<div>
						{displayOrganizationSettings && (
							<div>
								<OrganizationAddUser
									selectedOrganizationID={selectedOrganizationID}
								/>
								<OrganizationChannelCreate
									selectedOrganizationID={selectedOrganizationID}
								/>
								<OrganizationCreate />
							</div>
						)}
					</div>
				</div>
				{/* <ChatChannelCreator
					selectedChannelName={selectedChannelName}
					setUserChannels={setUserChannels}
				/> */}

				<div>
					{/* <h4>Channel</h4>
					{userChannels &&
						userChannels.map((channel) => (
							<div>
								<ChatChannel
									channelName={channel.channel_name}
									selectedChannel={selectedChannel}
									setSelectedChannel={setSelectedChannel}
									setSelectedChannelName={setSelectedChannelName}
								/>
							</div>
						))} */}
				</div>
				<div>
					<h4>Organization Channels</h4>
					{organizationChannels &&
						organizationChannels.map((channel) => (
							<div>
								<ChatChannel
									channelName={channel.channel_name}
									selectedChannel={selectedChannel}
									setSelectedChannel={setSelectedChannel}
									setSelectedChannelName={setSelectedChannelName}
								/>
							</div>
						))}
				</div>
			</div>
			<>
				{selectedChannel && (
					<ChatFrame
						channelSocket={selectedChannel}
						channelName={selectedChannelName}
					/>
				)}
			</>
			<div></div>
		</div>
	);
};

export default HomePage;
