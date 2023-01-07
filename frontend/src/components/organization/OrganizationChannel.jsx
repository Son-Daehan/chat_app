import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveOrganizationChannels } from "../../redux/reducers/OrganizationSlice";
import ChatChannel from "../channel/ChatChannel";

const OrganizationChannel = ({}) => {
	const { defaultOrganization, defaultOrganizationChannels } = useSelector(
		(state) => state.organization
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (defaultOrganization) {
			dispatch(retrieveOrganizationChannels(defaultOrganization.id));
		}
	}, [defaultOrganization]);

	return (
		<>
			<div className="organization-channel-header-container">
				<h4>
					<em>Organization Channels</em>
				</h4>
			</div>
			<hr />
			<ul className="organization-channel-body-container">
				{defaultOrganizationChannels &&
					defaultOrganizationChannels.map((channel) => (
						<li>
							<ChatChannel
								organizationChannel={channel}
								channelName={channel.channel_name}
							/>
						</li>
					))}
			</ul>
		</>
	);
};

export default OrganizationChannel;
