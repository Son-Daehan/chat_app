import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChatFrame = () => {
	const [messages, setMessages] = useState([]);

	const { selectedChannelName, selectedChannelSocket } = useSelector(
		(state) => state.channel
	);
	const { defaultOrganization } = useSelector((state) => state.organization);
	const { profileImg } = useSelector((state) => state.user);

	selectedChannelSocket.onmessage = function (e) {
		const data = JSON.parse(e.data);

		const user = data.user;
		const msg = data.message;

		setMessages((prevState) => [...prevState, { user: user, message: msg }]);
	};

	const handleRetreiveChannelLog = async () => {
		const response = await axios.get(
			`/api/chat/chat_log/${defaultOrganization.organization.organization_name}_${selectedChannelName}/`
		);
		const data = response.data.data;

		setMessages(data);
	};

	useEffect(() => {
		handleRetreiveChannelLog();
	}, [selectedChannelSocket]);

	const bottomRef = useRef(null);

	useEffect(() => {
		if (messages) {
			bottomRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<div className="chat-frame-container">
			<div className="chat-frame-message-container">
				<div className="chat-frame-message-wrapper">
					{messages &&
						messages.map((message) => {
							return (
								<div className="message-container">
									<div className="user-message-container">
										{profileImg ? (
											<img
												src={profileImg.img_url}
												style={{ height: "50px", width: "50px" }}
											/>
										) : (
											""
										)}
										<div>
											<div>{message.user}</div>
											<div>{message.message}</div>
										</div>
									</div>
								</div>
							);
						})}
					<div ref={bottomRef}></div>
				</div>
			</div>
		</div>
	);
};

export default ChatFrame;
