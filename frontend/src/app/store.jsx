import { configureStore } from "@reduxjs/toolkit";
import ChatLog from "../features/chat/ChatLog";

export default configureStore({
	reducer: {
		chatLog: ChatLog,
	},
});
