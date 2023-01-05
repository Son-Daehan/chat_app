import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateOrganizationChannelModal = ({ selectedOrganizationID }) => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [inputChannelName, setInputChannelName] = useState(null);
	const [inputChannelPrivacy, setInputChannelPrivacy] = useState(false);

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleCreateOrganizationChannel = async () => {
		const data = {
			channelName: inputChannelName,
			channelPrivacy: inputChannelPrivacy,
		};

		const response = await axios.post(
			`/api/organization/channel/${selectedOrganizationID}/`,
			data
		);
	};

	return (
		<>
			<Button className="me-2 mb-2" onClick={() => handleShow("md-down")}>
				Create Organization Channel
			</Button>
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Create Organization</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<input
						onChange={(event) => setInputChannelName(event.target.value)}
					/>
					<button onClick={handleCreateOrganizationChannel}>
						Add a new channel to org
					</button>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default CreateOrganizationChannelModal;
