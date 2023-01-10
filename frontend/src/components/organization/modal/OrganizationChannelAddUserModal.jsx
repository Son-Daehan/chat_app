import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { organizationChannelAddUser } from "../../../redux/reducers/OrganizationSlice";
import { IoIosPeople } from "react-icons/io";
import { useEffect } from "react";
import "./modal.css";

const OrganizationChannelAddUserModal = () => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const { selectedChannel } = useSelector((state) => state.channel);
	const { defaultOrganization } = useSelector((state) => state.organization);
	const [queryAllMembers, setQueryAllMembers] = useState("");
	const [queryChannelMembers, setQueryChannelMembers] = useState("");
	const [displayAddUserTab, setDisplayAddUserTab] = useState(false);

	const dispatch = useDispatch();

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleOrganizationChannelAddUser = (username) => {
		const data = {
			channelID: selectedChannel.id,
			username: username,
		};

		dispatch(organizationChannelAddUser(data));
	};

	const searchAllMembers = () => {
		const response = defaultOrganization.members.filter((member) =>
			member.username.includes(searchInput)
		);
		setQueryAllMembers(response);
	};
	const searchChannelMembers = () => {
		const response = selectedChannel.members.filter((member) =>
			member.username.includes(searchInput)
		);
		setQueryChannelMembers(response);
	};

	useEffect(() => {
		if (displayAddUserTab) {
			if (queryAllMembers === "") {
				setQueryAllMembers(defaultOrganization.members);
			} else {
				searchAllMembers();
			}
		} else if (!displayAddUserTab) {
			if (queryChannelMembers === "") {
				setQueryChannelMembers(selectedChannel.members);
			} else {
				searchChannelMembers();
			}
		}
	}, [searchInput, displayAddUserTab, defaultOrganization, selectedChannel]);

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
							<button
								onClick={() => {
									setDisplayAddUserTab(true);
									setSearchInput("");
								}}
							>
								Add
							</button>
							<button
								onClick={() => {
									setDisplayAddUserTab(false);
									setSearchInput("");
								}}
							>
								Remove
							</button>
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
							{displayAddUserTab
								? queryAllMembers &&
								  queryAllMembers?.map((member) => (
										<div className="organization-channel-add-modal-user-container">
											<div>
												{member.first_name} {member.last_name}
											</div>
											<div>{member.email}</div>
											<button
												onClick={() =>
													handleOrganizationChannelAddUser(member.username)
												}
											>
												+
											</button>
										</div>
								  ))
								: queryChannelMembers &&
								  queryChannelMembers?.map((member) => (
										<div className="organization-channel-add-modal-user-container">
											<div>Image</div>
											<div>
												<div>
													{member.first_name} {member.last_name}
												</div>
												<div>{member.email}</div>
											</div>
											<button
												onClick={() =>
													handleOrganizationChannelAddUser(member.username)
												}
											>
												+
											</button>
										</div>
								  ))}
						</div>
					</Modal.Body>
				</div>
			</Modal>
		</>
	);
};

export default OrganizationChannelAddUserModal;
