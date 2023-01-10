import React from "react";
import { useSelector } from "react-redux";
import OrganizationChannelAddUserModal from "../../organization/modal/OrganizationChannelAddUserModal";

const MiddleFrameHeader = () => {
	const { selectedChannel } = useSelector((state) => state.channel);
	const { selectedOrganizationChannelUsers } = useSelector(
		(state) => state.organization
	);

	return (
		<div className="homepage-middle-frame-header-container homepage-header-container">
			<div className="homepage-middle-frame-header-title-container">
				<h2>{selectedChannel && selectedChannel.channel_name}</h2>
			</div>
			<div className="homepage-middle-frame-channel-user-container">
				{selectedChannel?.members?.length}

				<OrganizationChannelAddUserModal />
			</div>
		</div>
	);
};

export default MiddleFrameHeader;
