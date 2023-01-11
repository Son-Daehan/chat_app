import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
	organizationAddUser,
	retrieveSingleOrganization,
	setDefaultOrganization,
} from "../../../redux/reducers/OrganizationSlice";
import { FaUsersCog } from "react-icons/fa";
import axios from "axios";
import { retrieveAllUsers } from "../../../redux/reducers/AuthSlice";

const OrganizationAddUserModal = () => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [inputUsername, setInputUsername] = useState(null);
	const [searchInput, setSearchInput] = useState("");
	const [queryAllUsers, setQueryAllUsers] = useState("");
	const [queryOrganizationUsers, setQueryOrganizationUsers] = useState("");
	const [displayAddUserTab, setDisplayAddUserTab] = useState(false);
	const [loading, setLoading] = useState(true);

	const { defaultOrganization } = useSelector((state) => state.organization);
	const { allUsers } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleAddUserToOrganization = async (username) => {
		if (defaultOrganization) {
			const data = {
				organizationID: defaultOrganization.id,
				username: username,
			};
			dispatch(organizationAddUser(data));
		}
		setLoading(false);
	};

	const searchAllUsers = () => {
		const response = allUsers.filter((user) =>
			user.username.includes(searchInput)
		);
		setQueryAllUsers(response);
	};
	const searchOrganizationUsers = () => {
		const response = defaultOrganization?.members?.filter((user) =>
			user.username.includes(searchInput)
		);
		setQueryOrganizationUsers(response);
	};

	useEffect(() => {
		if (displayAddUserTab) {
			if (queryAllUsers === "") {
				setQueryAllUsers(allUsers);
			} else {
				searchAllUsers();
			}
		} else if (!displayAddUserTab) {
			if (queryOrganizationUsers === "") {
				setQueryOrganizationUsers(defaultOrganization?.members);
			} else {
				searchOrganizationUsers();
			}
		}
	}, [searchInput, displayAddUserTab, defaultOrganization]);

	useEffect(() => {
		dispatch(retrieveAllUsers());
	}, []);

	useEffect(() => {
		if (!loading) {
			dispatch(retrieveSingleOrganization(defaultOrganization.id));
		}
	}, [loading]);

	return (
		<>
			<Button className="me-2 mb-2" onClick={() => handleShow("md-down")}>
				<FaUsersCog style={{ height: "35px", width: "35px" }} />
			</Button>
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<div className="custom-modal">
					<Modal.Header closeButton>
						<Modal.Title>Add User to Organization</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="organization-channel-add-modal-button-container">
							<button
								onClick={() => {
									setDisplayAddUserTab(true);
									setSearchInput("");
								}}
							>
								Add
							</button>
							<button
								onClick={() => {
									setDisplayAddUserTab(false);
									setSearchInput("");
								}}
							>
								Remove
							</button>
						</div>
						<div className="input-container">
							<input
								className="input-container"
								onChange={(event) => setSearchInput(event.target.value)}
							/>

							<Button onClick={handleAddUserToOrganization} variant="seondary">
								Add User To Org
							</Button>
						</div>
						<hr />
						<div className="organization-channel-add-modal-user-list-container">
							{displayAddUserTab
								? queryAllUsers &&
								  queryAllUsers?.map((user) => (
										<div className="organization-channel-add-modal-user-container">
											<div>
												{user.first_name} {user.last_name}
											</div>
											<div>{user.email}</div>
											<button
												onClick={() =>
													handleAddUserToOrganization(user.username)
												}
											>
												+
											</button>
										</div>
								  ))
								: queryOrganizationUsers &&
								  queryOrganizationUsers?.map((user) => (
										<div className="organization-channel-add-modal-user-container">
											<div>Image</div>
											<div>
												<div>
													{user.first_name} {user.last_name}
												</div>
												<div>{user.email}</div>
											</div>
											<button
												onClick={() =>
													handleAddUserToOrganization(user.username)
												}
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

export default OrganizationAddUserModal;
