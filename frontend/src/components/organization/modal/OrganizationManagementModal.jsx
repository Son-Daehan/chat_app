import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
	organizationRemoveUser,
	retrieveSingleOrganization,
} from "../../../redux/reducers/OrganizationSlice";
import { FaUsersCog } from "react-icons/fa";

const OrganizationManagementModal = () => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [queryOrganizationUsers, setQueryOrganizationUsers] = useState("");

	const { defaultOrganization } = useSelector((state) => state.organization);

	const dispatch = useDispatch();

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleRemoveUserFromOrganization = async (userID) => {
		if (defaultOrganization) {
			const data = {
				organizationID: defaultOrganization.id,
				userID: userID,
			};
			await dispatch(organizationRemoveUser(data));
			dispatch(retrieveSingleOrganization(defaultOrganization.id));
		}
	};

	const searchOrganizationUsers = () => {
		const response = defaultOrganization?.members?.filter((user) =>
			user.username.includes(searchInput)
		);
		setQueryOrganizationUsers(response);
	};

	useEffect(() => {
		if (queryOrganizationUsers === "") {
			setQueryOrganizationUsers(defaultOrganization?.members);
		} else {
			searchOrganizationUsers();
		}
	}, [searchInput, defaultOrganization]);

	return (
		<>
			<Button className="me-2 mb-2" onClick={() => handleShow("md-down")}>
				<FaUsersCog style={{ height: "25px", width: "25px" }} />
			</Button>
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<div className="custom-modal">
					<Modal.Header closeButton>
						<Modal.Title>Organization Management</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="input-container">
							<input
								className="input-container"
								onChange={(event) => setSearchInput(event.target.value)}
							/>
						</div>
						<hr />
						<div className="organization-channel-add-modal-user-list-container">
							{queryOrganizationUsers &&
								queryOrganizationUsers?.map((user) => (
									<div className="organization-channel-add-modal-user-container">
										<div>
											{user.first_name} {user.last_name}
										</div>
										<div>{user.email}</div>
										<button
											onClick={() => handleRemoveUserFromOrganization(user.id)}
										>
											+
										</button>
									</div>
								))}
						</div>
					</Modal.Body>
				</div>
			</Modal>
		</>
	);
};

export default OrganizationManagementModal;
