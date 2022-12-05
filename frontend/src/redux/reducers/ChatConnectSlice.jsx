import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	// loading: false,
	error: null,
	chatRoom: null,
	connected: false,
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

const ChatConnectSlice = createSlice({
	name: "chatRoom",
	initialState,
	reducers: {
		connectChatRoom: (state) => {
			state.chatRoom = "lobby";
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

export const { connectChatRoom } = ChatConnectSlice.actions;
export default ChatConnectSlice.reducer;
