import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const ChatFrame = ({ channelSocket, channelName }) => {
	const [inputMessage, setInputMessage] = useState(null);
	const [messages, setMessages] = useState([]);

	const { userInfo } = useSelector((state) => state.user);

	const handleSendMessageForm = (event) => {
		// console.log(channelSocket.url);
		event.preventDefault();
		event.target.reset();

		const message_data = {
			room_name: channelName,
			user: userInfo.email,
			message: inputMessage,
		};

		channelSocket.send(JSON.stringify(message_data));
		setInputMessage(null);
	};

	channelSocket.onmessage = function (e) {
		const data = JSON.parse(e.data);

		const user = data.user;
		const msg = data.message;

		setMessages((prevState) => [...prevState, { user: user, message: msg }]);
		// console.log(messages);
	};

	const handleRetreiveChannelLog = async () => {
		const response = await axios.get(`/api/chat/chat_log/${channelName}`);
		const data = response.data.data;
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
	}, [channelSocket]);

	return (
		<div className="chat-frame-container large-container">
			<div className="chat-frame-wrapper large-container">
				<div className="chat-frame-message-container med-container">
					{messages &&
						messages.map((message) => {
							return (
								<div className="user-message-container">
									<div>Image</div>
									<div>
										<div>{message.user}</div>
										<div>{message.message}</div>
									</div>
								</div>
							);
						})}
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
		</div>
	);
};

export default ChatFrame;
