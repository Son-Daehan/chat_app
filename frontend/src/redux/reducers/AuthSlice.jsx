import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	userInfo: null,
	loading: false,
	error: null,
	success: false,
};

export const signUp = createAsyncThunk(
	"signUp",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.post("/account/register/", data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const signIn = createAsyncThunk("SignIn", async (data) => {
	const response = await axios.post("/account/log_in/", data);

	// console.log(response);
	try {
		return response.data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

const AuthSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		// addSessionID: (state, action) => {
		// 	state.sessionID = sessionStorage.getItem("sessionid");
		// },
		// addUser: (state, action) => {
		// 	state.user = localStorage.getItem("user");
		// },
		// logout: (state, action) => {
		// 	state.token = null;
		// 	localStorage.clear();
		// },
	},
	extraReducers: {
		// [signUp.pending]: (state, action) => {
		// 	console.log("working pending");
		// 	state.loading = true;
		// },
		// // sign in
		[signIn.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[signIn.fulfilled]: (state, { payload }) => {
			// console.log(payload);
			state.loading = false;
			// THE RESPONSE SENT FROM BACKEND IS AN OBJECT WITH PROPERTIES?? WONT SET TO STATE
			const newUserInfo = {
				email: payload.user_info.email,
				firstName: payload.user_info.first_name,
				lastName: payload.user_info.last_name,
			};
			state.userInfo = newUserInfo;
			// state.sessionID = payload.sessionID;
		},
		[signIn.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},

		// // sign up
		[signUp.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[signUp.fulfilled]: (state, { payload: { error, msg } }) => {
			state.loading = false;
			state.success = true; // registration successful
		},
		[signUp.rejected]: (state, { payload }) => {
			// console.log(action.payload.message);
			state.error = payload.message;
			state.loading = false;
		},
	},
});

export const { addSessionID, addUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
