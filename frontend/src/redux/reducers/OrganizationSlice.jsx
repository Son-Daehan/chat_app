import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	organizations: null,
	defaultOrganization:
		JSON.parse(localStorage.getItem("defaultOrganization")) || null,
	defaultOrganizationChannels:
		JSON.parse(localStorage.getItem("defaultOrganizationChannels")) || null,
	displayOrganizationSettings: false,
};

export const retrieveOrganization = createAsyncThunk(
	"retrieveOrganization",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axios.get("/api/organizations/");
			return response.data.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const retrieveOrganizationChannels = createAsyncThunk(
	"retrieveOrganizationChannels",
	async (organizationID, { getState, rejectWithValue }) => {
		const state = getState();
		try {
			if (state.defaultOrganizationID) {
				const response = await axios.get(
					`/api/organization/channel/${state.defaultOrganizationID}/`
				);

				return response.data.data;
			} else {
				const response = await axios.get(
					`/api/organization/channel/${organizationID}/`
				);
				console.log(response.data.data);

				return response.data.data;
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const OrganizationSlice = createSlice({
	name: "organization",
	initialState,
	reducers: {
		setDefaultOrganization: (state, action) => {
			state.defaultOrganization = action.payload;
			localStorage.setItem(
				"defaultOrganization",
				JSON.stringify(action.payload)
			);
		},
		handleDisplayOrganizationSettings: (state) => {
			if (state.displayOrganizationSettings) {
				state.displayOrganizationSettings = false;
				console.log("yes");
			} else {
				state.displayOrganizationSettings = true;
			}
		},
	},
	extraReducers: {
		[retrieveOrganization.pending]: (state) => {
			console.log("pending works");
		},
		[retrieveOrganization.fulfilled]: (state, action) => {
			state.organizations = action.payload;
		},
		[retrieveOrganization.rejected]: (state, action) => {
			console.log("rejected works");
		},
		[retrieveOrganizationChannels.pending]: (state) => {
			console.log("pending works");
		},
		[retrieveOrganizationChannels.fulfilled]: (state, action) => {
			state.defaultOrganizationChannels = action.payload;
		},
		[retrieveOrganizationChannels.rejected]: (state, action) => {
			console.log("rejected works");
		},
	},
});

export const { setDefaultOrganization, handleDisplayOrganizationSettings } =
	OrganizationSlice.actions;
export default OrganizationSlice.reducer;
