import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	connectChannel,
	setSelectedChannel,
} from "../../redux/reducers/ChannelSlice";
import { retrieveOrganizationChannelUsers } from "../../redux/reducers/OrganizationSlice";

const ChatChannel = ({ organizationChannel, channelName }) => {
	const { selectedChannel, selectedChannelSocket } = useSelector(
		(state) => state.channel
	);
	const { defaultOrganization } = useSelector((state) => state.organization);

	const dispatch = useDispatch();

	const handleCreateSocket = () => {
		if (selectedChannelSocket) {
			selectedChannelSocket.close();
		}

		const newSocket = new WebSocket(
			`ws://` +
				window.location.host +
				`/ws/chat/${defaultOrganization.organization.organization_name}_${channelName}/`
		);

		dispatch(
			connectChannel({ channelSocket: newSocket, channelName: channelName })
		);
		dispatch(setSelectedChannel(organizationChannel));
	};

	// MOVE TO MIDDLE FRAME HEADER
	useEffect(() => {
		if (selectedChannel) {
			dispatch(retrieveOrganizationChannelUsers(selectedChannel.id));
		}
	}, [selectedChannel]);

	return (
		<div onClick={handleCreateSocket}>
			<h5>
				<em>{channelName}</em>
			</h5>
		</div>
	);
};

export default ChatChannel;
