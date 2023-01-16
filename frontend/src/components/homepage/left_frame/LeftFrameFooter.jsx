import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUsersCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signOut } from "../../../redux/reducers/AuthSlice";
import ManageProfileModal from "../../account/ManageProfileModal";
import OrganizationAddUserModal from "../../organization/modal/organization/OrganizationAddUserModal";
import OrganizationManagementModal from "../..//organization/modal/organization/OrganizationManagementModal";

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

	return (
		<div className="homepage-left-frame-footer-container homepage-footer-container">
			<div className="homepage-left-frame-footer-wrapper">
				<div className="homepage-left-frame-footer-user-icon-container">
					<div className="homepage-left-frame-footer-user-icon-left-wrapper">
						<OrganizationManagementModal />
						{defaultOrganization?.members?.length}
					</div>
					<OrganizationAddUserModal />
				</div>
				<ManageProfileModal />
				<div
					onClick={handleLogout}
					className="homepage-left-frame-footer-logout-container"
				>
					<AiOutlineLogout
						style={{
							height: "25px",
							width: "25px",
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default LeftFrameFooter;
