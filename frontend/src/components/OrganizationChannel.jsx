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
				<h4>
					<em>Organization Channels</em>
				</h4>
			</div>
			<hr />
			<ul className="navbar-organization-channel-container">
				{defaultOrganizationChannels &&
					defaultOrganizationChannels.map((channel) => (
						<li>
							<ChatChannel
								organizationChannel={channel}
								channelName={channel.channel_name}
								channelID={channel.id}
							/>
						</li>
					))}
			</ul>
		</div>
	);
};

export default OrganizationChannel;
