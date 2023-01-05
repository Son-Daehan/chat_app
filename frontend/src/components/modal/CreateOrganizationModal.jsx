import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateOrganizationModal = () => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}
	return (
		<>
			{values.map((v, idx) => (
				<Button key={idx} className="me-2 mb-2" onClick={() => handleShow(v)}>
					Full screen
					{typeof v === "string" && `below ${v.split("-")[0]}`}
				</Button>
			))}
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Modal</Modal.Title>
				</Modal.Header>
				<Modal.Body>Modal body content</Modal.Body>
			</Modal>
		</>
	);
};

export default CreateOrganizationModal;
