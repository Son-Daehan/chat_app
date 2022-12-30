import React, { useState } from "react";
import ChatFrame from "../components/ChatFrame";
import ChatChannelCreator from "../components/ChatChannelCreator";
import ChatChannel from "../components/ChatChannel";
import "./homepage.css";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const HomePage = () => {
	const [selectedChannel, setSelectedChannel] = useState(null);
	const [selectedChannelName, setSelectedChannelName] = useState([]);
	const [userChannels, setUserChannels] = useState([]);

	const handleRetrieveUserChannels = async () => {
		const response = await axios.get("/api/chat/user_channels/");
		const allUserChannels = response.data.channels;

		setUserChannels(allUserChannels);
	};

	useEffect(() => {
		handleRetrieveUserChannels();
		// console.log(selectedChannel);
	}, []);

	useEffect(() => {
		console.log(userChannels);
	}, [userChannels]);

	return (
		<div className="homepage-container">
			<div className="contacts-container">
				<Navbar />
				<ChatChannelCreator setUserChannels={setUserChannels} />
				<div>Contacts</div>
				<div>
					<h4>Channel</h4>
					{userChannels &&
						userChannels.map((channel) => (
							<div>
								<ChatChannel
									channelName={channel.channel_name}
									selectedChannel={selectedChannel}
									setSelectedChannel={setSelectedChannel}
									setSelectedChannelName={setSelectedChannelName}
								/>
							</div>
						))}
				</div>
				<div>Direct Messaging</div>
			</div>
			<>
				{selectedChannel && (
					<ChatFrame
						channelSocket={selectedChannel}
						channelName={selectedChannelName}
					/>
				)}
			</>
			<div></div>
		</div>
	);
};

export default HomePage;
