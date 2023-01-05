import React from "react";
import { useSelector } from "react-redux";
import ChatChannel from "./ChatChannel";
import "./navbar.css";

const OrganizationChannel = ({}) => {
	const { defaultOrganizationChannels } = useSelector(
		(state) => state.organization
	);

	return (
		<div className="navbar-organization-container">
			<div className="navbar-organization-channel-header-container">
				<h4>Organization Channels</h4>
			</div>
			<div className="navbar-organization-channel-container">
				{defaultOrganizationChannels &&
					defaultOrganizationChannels.map((channel) => (
						<div>
							<ChatChannel channelName={channel.channel_name} />
						</div>
					))}
			</div>
		</div>
	);
};

export default OrganizationChannel;
