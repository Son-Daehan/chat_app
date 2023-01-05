import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const ChatFrame = () => {
	const [inputMessage, setInputMessage] = useState(null);
	const [messages, setMessages] = useState([]);

	const { userInfo } = useSelector((state) => state.user);
	const { selectedChannelName, selectedChannelSocket } = useSelector(
		(state) => state.channel
	);

	const handleSendMessageForm = (event) => {
		// console.log(channelSocket.url);
		event.preventDefault();
		event.target.reset();

		const message_data = {
			room_name: selectedChannelName,
			user: userInfo.email,
			message: inputMessage,
		};

		selectedChannelSocket.send(JSON.stringify(message_data));
		setInputMessage(null);
	};

	selectedChannelSocket.onmessage = function (e) {
		const data = JSON.parse(e.data);

		const user = data.user;
		const msg = data.message;

		setMessages((prevState) => [...prevState, { user: user, message: msg }]);
		console.log(messages);
	};

	const handleRetreiveChannelLog = async () => {
		const response = await axios.get(
			`/api/chat/chat_log/${selectedChannelName}/`
		);
		const data = response.data.data;
		console.log(data);
		// console.log(data);

		// const message_data = {
		// 	user: data.user,
		// 	message: data.message,
		// };

		setMessages(data);
	};

	useEffect(() => {
		handleRetreiveChannelLog();
		// console.log(messages);
	}, [selectedChannelSocket]);

	const bottomRef = useRef(null);

	useEffect(() => {
		if (messages) {
			bottomRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<div className="chat-frame-container">
			<div>
				<div className="chat-frame-header-container">
					<div className="chat-frame-header-left-wrapper">
						<div className="chat-frame-header-channel-name-container">
							<h2>{selectedChannelName}</h2>
						</div>
					</div>
					<div className="chat-frame-header-right-wrapper">
						<div>55</div>
						<div>Add +</div>
					</div>
				</div>
				<hr />
			</div>
			<div className="chat-frame-message-container">
				<div className="chat-frame-message-wrapper">
					{messages &&
						messages.map((message) => {
							return (
								<div className="message-container">
									<div className="user-message-container">
										<div>Image</div>
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
			<div className="chat-frame-input-message-container">
				<form
					onSubmit={handleSendMessageForm}
					className="chat-frame-input-message-wrapper med-container"
				>
					<input
						className="chat-frame-input-message small-container"
						type="text"
						onChange={(event) => setInputMessage(event.target.value)}
					/>
					<button type="submit">Send</button>
				</form>
			</div>
		</div>
	);
};

export default ChatFrame;
