import AuthSlice from "../reducers/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		user: AuthSlice,
	},
});

export default store;
