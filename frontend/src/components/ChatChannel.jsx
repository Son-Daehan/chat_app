import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectChannel } from "../redux/reducers/ChannelSlice";

const ChatChannel = ({ channelName }) => {
	const { selectedChannelSocket } = useSelector((state) => state.channel);

	const dispatch = useDispatch();

	const handleCloseChannel = () => {
		selectedChannelSocket.close();
	};

	// if (selectedChannelSocket) {
	// 	selectedChannelSocket.onopen = function () {
	// 		console.log("Chat socket has been connected");
	// 		// console.log(channelSocket);
	// 	};
	// }

	const handleCreateSocket = () => {
		if (selectedChannelSocket) {
			selectedChannelSocket.close();
		}

		const newSocket = new WebSocket(
			`ws://` + window.location.host + `/ws/chat/${channelName}/`
		);

		dispatch(
			connectChannel({ channelSocket: newSocket, channelName: channelName })
		);
	};

	return (
		<div onClick={handleCreateSocket}>
			<h5>
				<em>{channelName}</em>
			</h5>
		</div>
	);
};

export default ChatChannel;
