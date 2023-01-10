import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { createOrganizationChannel } from "../../../redux/reducers/OrganizationSlice";

const CreateOrganizationChannelModal = ({ selectedOrganizationID }) => {
	// const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [inputChannelName, setInputChannelName] = useState(null);
	const [inputChannelPrivacy, setInputChannelPrivacy] = useState(false);

	const { defaultOrganization } = useSelector((state) => state.organization);

	const dispatch = useDispatch();

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleCreateOrganizationChannel = async () => {
		const data = {
			organization_id: defaultOrganization.id,
			channel_name: inputChannelName,
			is_private: inputChannelPrivacy,
		};

		dispatch(createOrganizationChannel(data));
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
					<button
						onClick={() => {
							handleCreateOrganizationChannel();
							setShow(false);
						}}
					>
						Add a new channel to org
					</button>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default CreateOrganizationChannelModal;
