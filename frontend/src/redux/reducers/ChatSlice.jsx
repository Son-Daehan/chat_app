import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	chatLog: null,
};

export const sendMessageToRedis = createAsyncThunk(
	"sendMessageToRedis",
	async (data, { rejectWithValue }) => {
		try {
			const response = axios.post(
				`/api/chat/chat_log/${defaultOrganization.organization.organization_name}_${selectedChannelName}/`,
				data
			);

			console.log(response.data);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const ChatSlice = createSlice({
	name: "chatRoom",
	initialState,
	reducers: {},
});

export const {} = ChatSlice.actions;
export default ChatSlice.reducer;
