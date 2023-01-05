import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const OrganizationAddUserModal = ({ selectedOrganizationID }) => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [inputUsername, setInputUsername] = useState(null);

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleAddUserToOrganization = async () => {
		const data = {
			organizationID: selectedOrganizationID,
			username: inputUsername,
		};

		const response = await axios.post("/api/organization/add_user/", data);
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
					<div>
						<input onChange={(event) => setInputUsername(event.target.value)} />
						<button onClick={handleAddUserToOrganization}>
							Add User To Org
						</button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default OrganizationAddUserModal;
