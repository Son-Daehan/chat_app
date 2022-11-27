import React from "react";
import axios from "axios";

const ProfilePage = () => {
	axios.get("/api/user_profile").then((response) => console.log(response));

	return <div>ProfilePage</div>;
};

export default ProfilePage;
