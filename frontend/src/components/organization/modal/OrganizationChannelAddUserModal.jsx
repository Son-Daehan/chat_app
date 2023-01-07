import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { organizationChannelAddUser } from "../../../redux/reducers/OrganizationSlice";
import { IoIosPeople } from "react-icons/io";

const OrganizationChannelAddUserModal = () => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [inputUsername, setInputUsername] = useState(null);
	const { selectedChannel } = useSelector((state) => state.channel);

	const dispatch = useDispatch();

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleOrganizationChannelAddUser = () => {
		console.log(inputUsername);
		const data = {
			channelID: selectedChannel.id,
			username: inputUsername,
		};

		dispatch(organizationChannelAddUser(data));
	};

	return (
		<>
			<Button className="me-2 mb-2" onClick={() => handleShow("md-down")}>
				<IoIosPeople
					style={{
						height: "45px",
						width: "45px",
					}}
				/>
			</Button>
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Channel Users</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<input onChange={(event) => setInputUsername(event.target.value)} />
					<button onClick={handleOrganizationChannelAddUser}>
						Add User to Channel
					</button>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default OrganizationChannelAddUserModal;
