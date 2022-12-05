import React, { useState } from "react";
import { Link } from "react-router-dom";

const ChatPage = () => {
	const [room, setRoom] = useState("");

	const submitRoom = () => {
		console.log(room);
	};

	return (
		<div>
			<title>Chat Rooms</title>
			<p>What chat room would you like to enter?</p>
			<input type="text" onChange={(event) => setRoom(event.target.value)} />
			<Link to={`/chat/${room}`} onClick={ChatPage}>
				{" "}
				Room{" "}
			</Link>
		</div>
	);
};

export default ChatPage;
