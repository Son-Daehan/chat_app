import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { organizationAddUser } from "../../../redux/reducers/OrganizationSlice";

const OrganizationAddUserModal = ({ selectedOrganizationID }) => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [inputUsername, setInputUsername] = useState(null);

	const dispatch = useDispatch();

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleAddUserToOrganization = async () => {
		const data = {
			organizationID: selectedOrganizationID,
			username: inputUsername,
		};
		console.log(selectedOrganizationID);
		dispatch(organizationAddUser(data));
	};

	return (
		<>
			<Button className="me-2 mb-2" onClick={() => handleShow("md-down")}>
				Add User to Organization
			</Button>
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Add User to Organization</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="modal-input">
						<input
							className="modal-input"
							onChange={(event) => setInputUsername(event.target.value)}
						/>

						<Button onClick={handleAddUserToOrganization} variant="seondary">
							Add User To Org
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default OrganizationAddUserModal;
