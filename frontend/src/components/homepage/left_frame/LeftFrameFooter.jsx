import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUsersCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { retrieveOrganizationUsers } from "../../../redux/reducers/OrganizationSlice";
import axios from "axios";
import { signOut } from "../../../redux/reducers/AuthSlice";
import ManageProfileModal from "../../account/ManageProfileModal";

const LeftFrameFooter = () => {
	const { defaultOrganization, organizationUsers } = useSelector(
		(state) => state.organization
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		const response = await axios.post("/api/logout/");
		dispatch(signOut());
		navigate("/login");
	};

	useEffect(() => {
		if (defaultOrganization) {
			dispatch(retrieveOrganizationUsers(defaultOrganization.id));
		}
	}, [defaultOrganization]);

	return (
		<div className="homepage-left-frame-footer-container homepage-footer-container">
			<div className="homepage-left-frame-footer-wrapper">
				<div className="homepage-left-frame-footer-user-icon-container">
					{organizationUsers ? organizationUsers.length : ""}
					<FaUsersCog style={{ height: "35px", width: "35px" }} />
				</div>
				<ManageProfileModal />
				<div
					onClick={handleLogout}
					className="homepage-left-frame-footer-logout-container"
				>
					<AiOutlineLogout
						style={{
							height: "35px",
							width: "35px",
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default LeftFrameFooter;
