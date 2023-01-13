import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { createOrganization } from "../../../../redux/reducers/OrganizationSlice";
import "../modal.css";

const CreateOrganizationModal = () => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [inputOrganizationName, setInputOrganizationName] = useState(null);

	const dispatch = useDispatch();

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleCreateOrganization = async () => {
		const data = {
			organization_name: inputOrganizationName,
		};

		dispatch(createOrganization(data));
	};

	return (
		<>
			<Button className="me-2 mb-2" onClick={() => handleShow("md-down")}>
				Create Organization
			</Button>
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<div className="custom-modal">
					<Modal.Header closeButton>
						<Modal.Title>Create Organization</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="organization-create-modal-bottom-wrapper">
							<input
								placeholder="Enter a new organization..."
								onChange={(event) =>
									setInputOrganizationName(event.target.value)
								}
							/>
							<div className="organization-create-modal-button">
								<button
									onClick={() => {
										handleCreateOrganization();
										setShow(false);
									}}
								>
									Create Organization
								</button>
							</div>
						</div>
					</Modal.Body>
				</div>
			</Modal>
		</>
	);
};

export default CreateOrganizationModal;
