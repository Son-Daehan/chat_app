import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUsersCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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

	return (
		<div className="homepage-left-frame-footer-container homepage-footer-container">
			<div className="homepage-left-frame-footer-wrapper">
				<div className="homepage-left-frame-footer-user-icon-container">
					{defaultOrganization?.members?.length}
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
