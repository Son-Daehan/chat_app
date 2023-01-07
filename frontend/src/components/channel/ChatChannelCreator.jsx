import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const ChatChannelCreator = ({ setUserChannels, selectedChannelName }) => {
	const [channelName, setChannelName] = useState(null);
	const [inputUsername, setInputUsername] = useState(null);

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
	};

	const handleAddUserToChannel = async () => {
		const data = {
			username: inputUsername,
			channel: selectedChannelName,
		};

		const response = await axios.post("/api/chat/channels/add_user/", data);
	};

	return (
		<div>
			<div>
				<input onChange={(event) => setChannelName(event.target.value)} />
				<button onClick={handleNewSocketConnection}>Create Room</button>
			</div>
			<div>
				<h1>add a user to channel</h1>
				<input onChange={(event) => setInputUsername(event.target.value)} />
				<button onClick={handleAddUserToChannel}>Add User</button>
			</div>
		</div>
	);
};

export default ChatChannelCreator;
