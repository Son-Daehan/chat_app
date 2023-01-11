import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { organizationChannelAddUser } from "../../../redux/reducers/OrganizationSlice";
import { IoMdPersonAdd } from "react-icons/io";
import "./modal.css";
import { updateSelectedChannel } from "../../../redux/reducers/ChannelSlice";

const OrganizationChannelAddUserModal = () => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const { selectedChannel } = useSelector((state) => state.channel);

	const dispatch = useDispatch();

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleOrganizationChannelAddUser = async (event) => {
		event.preventDefault();
		const data = {
			channelID: selectedChannel.id,
			username: searchInput,
		};

		await dispatch(organizationChannelAddUser(data));
		dispatch(updateSelectedChannel(selectedChannel.id));
		setShow(false);
	};

	return (
		<>
			<Button className="me-2 mb-2" onClick={() => handleShow("md-down")}>
				<IoMdPersonAdd
					style={{
						height: "45px",
						width: "45px",
					}}
				/>
			</Button>
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<div className="custom-modal">
					<Modal.Header closeButton>
						<Modal.Title>Channel Management</Modal.Title>
					</Modal.Header>
					<Modal.Body
						style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
					>
						<div className="organization-channel-add-modal-button-container">
							<h4>Add users to the channel</h4>
						</div>
						<form
							onSubmit={handleOrganizationChannelAddUser}
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								gap: "20px",
							}}
						>
							<input
								value={searchInput}
								onChange={(event) => setSearchInput(event.target.value)}
								placeholder="Search for a user..."
								className="input-container"
							/>
							<button type="submit">+</button>
						</form>
						<hr />
					</Modal.Body>
				</div>
			</Modal>
		</>
	);
};

export default OrganizationChannelAddUserModal;
