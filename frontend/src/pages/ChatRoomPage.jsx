import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const ChatPage = ({ user }) => {
	// TO GET THE ROOM NAME
	const { room } = useParams();
	const [text, setText] = useState("");

	const { userInfo } = useSelector((state) => state.user);

	const chatSocket = new WebSocket(
		// "ws://" + window.location.host + "/ws/chat/" + room + "/"
		`ws://localhost:8000/ws/chat/${room}/`
	);

	chatSocket.onopen = function (e) {
		console.log("Chat socket has been connected");
	};

	chatSocket.onclose = function (e) {
		console.error("Chat socket closed unexpectedly");
	};

	const sendText = async (event) => {
		const data = {
			room_name: room,
			user: userInfo.email,
			message: text,
		};

		const response = await axios.post("/chat/chat_log/", data);
		console.log(response);
		chatSocket.send(
			JSON.stringify({
				message: `${userInfo.email}: ${text}`,
			})
		);
	};

	useEffect(() => {
		chatSocket.onmessage = function (e) {
			const data = JSON.parse(e.data);
			console.log(data);
			document.querySelector("#chat-log").value += data.message + "\n";
		};
		console.log(userInfo);
	}, []);

	return (
		<>
			<textarea id="chat-log" cols="100" rows="20"></textarea>
			<input type="text" onChange={(event) => setText(event.target.value)} />
			<button onClick={sendText}>Send</button>
		</>
	);
};

export default ChatPage;
