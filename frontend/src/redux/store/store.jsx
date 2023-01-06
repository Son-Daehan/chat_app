import AuthSlice from "../reducers/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import ChatConnectSlice from "../reducers/ChatConnectSlice";
import OrganizationSlice from "../reducers/OrganizationSlice";
import ChannelSlice from "../reducers/ChannelSlice";
import ChatSlice from "../reducers/ChatSlice";

const store = configureStore({
	reducer: {
		user: AuthSlice,
		chat: ChatConnectSlice,
		channel: ChannelSlice,
		organization: OrganizationSlice,
		chatting: ChatSlice,
	},
});

export default store;
