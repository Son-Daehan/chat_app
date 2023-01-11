import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsPersonFill } from "react-icons/bs";

const ChatFrame = () => {
	const [messages, setMessages] = useState([]);

	const { selectedChannelName, selectedChannelSocket, selectedChannel } =
		useSelector((state) => state.channel);
	const { defaultOrganization } = useSelector((state) => state.organization);
	// const { profileImg } = useSelector((state) => state.user);
	const [profileImg, setProfileImg] = useState(null);
	const [channelMembers, setChannelMembers] = useState(
		selectedChannel.members || null
	);

	selectedChannelSocket.onmessage = function (e) {
		const data = JSON.parse(e.data);

		const user = data.user;
		const msg = data.message;

		setMessages((prevState) => [...prevState, { user: user, message: msg }]);
	};

	const handleRetreiveChannelLog = async () => {
		const response = await axios.get(
			`/api/chat/chat_log/${defaultOrganization.organization_name}_${selectedChannelName}/`
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
							let memberProfileImg = null;
							channelMembers.find((member) => {
								if (member.email == message.user) {
									memberProfileImg = member.profile_img;
								}
							});
							return (
								<div className="message-container">
									<div className="user-message-container">
										{memberProfileImg ? (
											<img
												src={`${memberProfileImg}/`}
												style={{ height: "50px", width: "50px" }}
											/>
										) : (
											<BsPersonFill style={{ height: "50px", width: "50px" }} />
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
