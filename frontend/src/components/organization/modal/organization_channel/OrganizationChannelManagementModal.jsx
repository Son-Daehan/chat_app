import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
	organizationChannelAddUser,
	organizationChannelRemoveUser,
} from "../../../../redux/reducers/OrganizationSlice";
import { IoIosPeople } from "react-icons/io";
import { useEffect } from "react";
import "../modal.css";
import { updateSelectedChannel } from "../../../../redux/reducers/ChannelSlice";

const OrganizationChannelManagementModal = () => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const { selectedChannel } = useSelector((state) => state.channel);
	const { defaultOrganization } = useSelector((state) => state.organization);
	const [queryAllMembers, setQueryAllMembers] = useState("");
	const [queryChannelMembers, setQueryChannelMembers] = useState("");

	const dispatch = useDispatch();

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleOrganizationChannelAddUser = async (username) => {
		const data = {
			channelID: selectedChannel.id,
			username: username,
		};

		await dispatch(organizationChannelAddUser(data));
		console.log(selectedChannel.id);
		dispatch(updateSelectedChannel(selectedChannel.id));
		setQueryAllMembers("");
		setQueryChannelMembers("");
	};

	const handleOrganizationChannelRemoveUser = async (userID) => {
		const data = {
			channelID: selectedChannel.id,
			userID: userID,
		};

		await dispatch(organizationChannelRemoveUser(data));
		dispatch(updateSelectedChannel(selectedChannel.id));
		setQueryAllMembers("");
		setQueryChannelMembers("");
	};

	const searchChannelMembers = () => {
		const response = selectedChannel.members.filter((member) =>
			member.username.includes(searchInput)
		);
		setQueryChannelMembers(response);
	};

	useEffect(() => {
		if (queryChannelMembers === "") {
			setQueryChannelMembers(selectedChannel.members);
		} else {
			searchChannelMembers();
		}
	}, [searchInput, defaultOrganization, selectedChannel]);

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
				<div className="custom-modal">
					<Modal.Header closeButton>
						<Modal.Title>Channel Users</Modal.Title>
					</Modal.Header>
					<Modal.Body
						style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
					>
						<div className="organization-channel-add-modal-button-container">
							<h4>Members</h4>
						</div>
						<div
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
						</div>
						<hr />
						<div className="organization-channel-add-modal-user-list-container">
							{queryChannelMembers &&
								queryChannelMembers?.map((member) => (
									<div className="organization-channel-add-modal-user-container">
										<div>
											{member.first_name} {member.last_name}
										</div>
										<div>{member.email}</div>
										<button
											onClick={() =>
												handleOrganizationChannelRemoveUser(member.id)
											}
										></button>
									</div>
								))}
						</div>
					</Modal.Body>
				</div>
			</Modal>
		</>
	);
};

export default OrganizationChannelManagementModal;
