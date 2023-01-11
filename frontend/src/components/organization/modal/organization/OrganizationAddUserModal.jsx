import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
	organizationAddUser,
	retrieveSingleOrganization,
} from "../../../../redux/reducers/OrganizationSlice";
import { IoMdPersonAdd } from "react-icons/io";

const OrganizationAddUserModal = () => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [searchInput, setSearchInput] = useState("");

	const { defaultOrganization } = useSelector((state) => state.organization);

	const dispatch = useDispatch();

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleAddUserToOrganization = async (event) => {
		event.preventDefault();
		if (defaultOrganization) {
			const data = {
				organizationID: defaultOrganization.id,
				username: searchInput,
			};
			await dispatch(organizationAddUser(data));
			dispatch(retrieveSingleOrganization(defaultOrganization.id));
			setShow(false);
		}
	};

	return (
		<>
			<Button className="me-2 mb-2" onClick={() => handleShow("md-down")}>
				<IoMdPersonAdd style={{ height: "25px", width: "25px" }} />
			</Button>
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<div className="custom-modal">
					<Modal.Header closeButton>
						<Modal.Title>Add User to Organization</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form
							onSubmit={handleAddUserToOrganization}
							className="input-container"
						>
							<input
								className="input-container"
								onChange={(event) => setSearchInput(event.target.value)}
							/>

							<Button type="submit" variant="seondary">
								Add User To Org
							</Button>
						</form>
						<hr />
					</Modal.Body>
				</div>
			</Modal>
		</>
	);
};

export default OrganizationAddUserModal;
