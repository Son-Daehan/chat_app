import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateOrganizationModal = () => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [inputOrganizationName, setInputOrganizationName] = useState(null);

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleCreateOrganization = async () => {
		const data = {
			organizationName: inputOrganizationName,
		};

		const response = await axios.post("/api/organizations/", data);
	};

	return (
		<>
			<Button className="me-2 mb-2" onClick={() => handleShow("md-down")}>
				Create Organization
			</Button>
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Create Organization</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<input
						onChange={(event) => setInputOrganizationName(event.target.value)}
					/>
					<button onClick={handleCreateOrganization}>
						Create Organization
					</button>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default CreateOrganizationModal;
