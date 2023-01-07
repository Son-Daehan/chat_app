import { useState } from "react";
import { useSelector } from "react-redux";
import { RiSendPlaneLine, RiSendPlaneFill } from "react-icons/ri";

const MiddleFrameFooter = () => {
	const [inputMessage, setInputMessage] = useState(null);
	const { selectedChannel, selectedChannelSocket } = useSelector(
		(state) => state.channel
	);
	const { defaultOrganization } = useSelector((state) => state.organization);
	const { userInfo } = useSelector((state) => state.user);

	const handleSendMessageForm = (event) => {
		// console.log(channelSocket.url);
		event.preventDefault();
		event.target.reset();

		const message_data = {
			room_name: `${defaultOrganization.organization.organization_name}_${selectedChannel.channel_name}`,
			user: userInfo.email,
			message: inputMessage,
		};

		selectedChannelSocket.send(JSON.stringify(message_data));
		setInputMessage(null);
	};

	return (
		<div className="homepage-middle-frame-footer-container homepage-footer-container">
			<div className="chat-frame-input-message-container">
				<form
					onSubmit={handleSendMessageForm}
					className="chat-frame-input-message-wrapper med-container"
				>
					<input
						className="chat-frame-input-message small-container"
						type="text"
						placeholder={`Message #${selectedChannel.channel_name}`}
						onChange={(event) => setInputMessage(event.target.value)}
					/>
					<div className="chat-frame-input-button">
						<div></div>
						<button type="submit">
							<RiSendPlaneFill style={{ height: "25px", width: "25px" }} />
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default MiddleFrameFooter;
