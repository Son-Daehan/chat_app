import React from "react";
import { useSelector } from "react-redux";
import ChatChannel from "./ChatChannel";

const OrganizationChannel = ({}) => {
	const { defaultOrganizationChannels } = useSelector(
		(state) => state.organization
	);

	return (
		<div>
			<h4>Organization Channels</h4>
			{defaultOrganizationChannels &&
				defaultOrganizationChannels.map((channel) => (
					<div>
						<ChatChannel channelName={channel.channel_name} />
					</div>
				))}
		</div>
	);
};

export default OrganizationChannel;
