import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const ChatChannelCreator = ({ setUserChannels }) => {
	const [channelName, setChannelName] = useState(null);
	const { userInfo } = useSelector((state) => state.user);

	const handleNewSocketConnection = () => {
		handleCreateChannel();
	};

	const handleCreateChannel = async () => {
		const data = {
			channelName: channelName,
			username: userInfo.email,
		};

		const response = await axios.post("/api/chat/channels/", data);

		setUserChannels((prevState) => [
			...prevState,
			{ channel_name: channelName },
		]);
		// console.log(response);
	};

	return (
		<div>
			<div>
				<input onChange={(event) => setChannelName(event.target.value)} />
				<button onClick={handleNewSocketConnection}>Create Room</button>
			</div>
		</div>
	);
};

export default ChatChannelCreator;
