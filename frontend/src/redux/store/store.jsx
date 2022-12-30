import AuthSlice from "../reducers/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import ChatConnectSlice from "../reducers/ChatConnectSlice";

const store = configureStore({
	reducer: {
		user: AuthSlice,
		chat: ChatConnectSlice,
	},
});

export default store;
