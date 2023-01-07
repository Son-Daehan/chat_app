import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	// loading: false,
	selectedChannelName: null,
	selectedChannelSocket: null,
	defaultChannel: JSON.parse(localStorage.getItem("defaultChannel")) || null,
	selectedChannel: null,
};

// export const connectChannel = createAsyncThunk(
// 	"connectChannel",
// 	async (data, { rejectWithValue }) => {
// 		try {
// 			const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/lobby/`);
// 		} catch (error) {
// 			return rejectWithValue(error);
// 		}
// 	}
// );
const ChannelSlice = createSlice({
	name: "channel",
	initialState,
	reducers: {
		connectChannel: (state, action) => {
			state.selectedChannelName = action.payload.channelName;
			state.selectedChannelSocket = action.payload.channelSocket;
		},
		setSelectedChannel: (state, action) => {
			state.selectedChannel = action.payload;
		},
	},
	// extraReducers: {
	// 	[connectChannel.pending]: (state) => {
	// 		console.log("pending works");
	// 		// state.loading = true;
	// 		// state.error = null;
	// 	},
	// 	[connectChannel.fulfilled]: (state, { payload }) => {
	// 		console.log("fulfilled works");
	// 		// console.log(payload);
	// 		// state.loading = false;
	// 		// THE RESPONSE SENT FROM BACKEND IS AN OBJECT WITH PROPERTIES?? WONT SET TO STATE
	// 		// const newUserInfo = {
	// 		// email: payload.user_info.username,
	// 		// firstName: payload.user_info.first_name,
	// 		// lastName: payload.user_info.last_name,
	// 		// };
	// 		// state.userInfo = newUserInfo;
	// 		// localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
	// 		// localStorage.setItem("hydrate", JSON.stringify(true));
	// 		// state.sessionID = payload.sessionID;
	// 	},
	// 	[connectChannel.rejected]: (state, { payload }) => {
	// 		console.log("rejected works");
	// 		// state.loading = false;
	// 		// state.error = payload.message;
	// 	},

	// 	// // // sign up
	// 	// [signUp.pending]: (state, action) => {
	// 	// 	state.loading = true;
	// 	// 	state.error = null;
	// 	// },
	// 	// [signUp.fulfilled]: (state, { payload: { error, msg } }) => {
	// 	// 	state.loading = false;
	// 	// 	state.success = true; // registration successful
	// 	// },
	// 	// [signUp.rejected]: (state, { payload }) => {
	// 	// 	// console.log(action.payload.message);
	// 	// 	state.error = payload.message;
	// 	// 	state.loading = false;
	// },
});

export const { connectChannel, setSelectedChannel } = ChannelSlice.actions;
export default ChannelSlice.reducer;
