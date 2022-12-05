import { useSelector } from "react-redux";

const ProfilePage = () => {
	const { loading, error, success, userInfo } = useSelector(
		(state) => state.user
	);

	return <div>{!userInfo && <div>yes</div>}</div>;
};

export default ProfilePage;
