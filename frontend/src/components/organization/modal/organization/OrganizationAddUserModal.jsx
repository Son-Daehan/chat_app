import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
	organizationAddUser,
	retrieveSingleOrganization,
} from "../../../../redux/reducers/OrganizationSlice";
import { IoMdPersonAdd } from "react-icons/io";
import { useEffect } from "react";
import { retrieveAllUsers } from "../../../../redux/reducers/AuthSlice";

const OrganizationAddUserModal = () => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [searchInput, setSearchInput] = useState("");

	const { defaultOrganization } = useSelector((state) => state.organization);
	const [filteredAllUsers, setFilteredAllUsers] = useState(null);
	const { allUsers } = useSelector((state) => state.user);
	const [queryUsers, setQueryUsers] = useState(null);

	const dispatch = useDispatch();

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleAddUserToOrganization = async (event) => {
		event.preventDefault();
		if (defaultOrganization) {
			const data = {
				organizationID: defaultOrganization.id,
				username: searchInput,
			};
			await dispatch(organizationAddUser(data));
			dispatch(retrieveSingleOrganization(defaultOrganization.id));
			setShow(false);
		}
	};

	const filterAllUsers = () => {
		if (allUsers) {
			let filteredUsers = allUsers.filter((user) => {
				let filteredUser = defaultOrganization.members.find(
					(userInOrganization) => userInOrganization.id === user.id
				);
				return !filteredUser;
			});

			setFilteredAllUsers(filteredUsers);
			setQueryUsers(filteredUsers);
		}
	};

	const searchAllUsers = () => {
		const response = filteredAllUsers.filter((user) =>
			user.username.includes(searchInput)
		);
		setQueryUsers(response);
	};

	useEffect(() => {
		if (show) {
			dispatch(retrieveAllUsers());
		}
	}, [show]);
	useEffect(() => {
		filterAllUsers();
	}, [allUsers]);

	useEffect(() => {
		if (queryUsers === null || queryUsers === "") {
			setQueryUsers(filteredAllUsers);
		} else {
			searchAllUsers();
		}
	}, [searchInput]);

	return (
		<>
			<Button className="me-2 mb-2" onClick={() => handleShow("md-down")}>
				<IoMdPersonAdd style={{ height: "20px", width: "20px" }} />
			</Button>
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<div className="custom-modal">
					<Modal.Header closeButton>
						<Modal.Title>Add User to Organization</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form
							onSubmit={handleAddUserToOrganization}
							className="input-container"
						>
							<input
								className="input-container"
								onChange={(event) => setSearchInput(event.target.value)}
							/>

							<Button type="submit" variant="seondary">
								Add User To Org
							</Button>
						</form>
						<hr />
						{queryUsers &&
							queryUsers.map((user) => (
								<div className="organization-channel-add-modal-user-container">
									<div>
										{user.first_name} {user.last_name}
									</div>
									<div>{user.email}</div>
									<button></button>
								</div>
							))}
					</Modal.Body>
				</div>
			</Modal>
		</>
	);
};

export default OrganizationAddUserModal;
