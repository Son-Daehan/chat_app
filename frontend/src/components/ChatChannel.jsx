import { useEffect } from "react";
import { useState } from "react";

const ChatChannel = ({
	channelName,
	selectedChannel,
	setSelectedChannel,
	setSelectedChannelName,
}) => {
	const [socket, setSocket] = useState(null);

	const handleCloseChannel = () => {
		socket.close();
	};

	if (socket) {
		socket.onopen = function () {
			console.log("Chat socket has been connected");
			// console.log(channelSocket);
		};
	}

	const handleCreateSocket = () => {
		if (selectedChannel) {
			selectedChannel.close();
		}

		const newSocket = new WebSocket(
			// `ws://localhost:8000/ws/chat/${channelName}/`
			`ws://localhost:8000/ws/chat/${channelName}/`
		);

		setSelectedChannel(newSocket);
		setSelectedChannelName(channelName);
		setSocket(newSocket);
	};

	return (
		<div onClick={handleCreateSocket}>
			<h5>
				<em>{channelName}</em>
			</h5>
			<button onClick={handleCloseChannel}>Close Channel</button>
		</div>
	);
};

export default ChatChannel;
