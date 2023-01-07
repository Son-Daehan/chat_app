import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { imageUpload } from "../../redux/reducers/AuthSlice";

const ManageProfileModal = ({ selectedOrganizationID }) => {
	const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [image, setImage] = useState(null);

	const { userInfo } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const handleImageUpload = () => {
		let formData = new FormData();
		console.log("working");
		formData.append("file", image);

		const data = {
			username: userInfo.username,
			// img_title: image.name,
			img: image,
		};
		console.log(data);

		dispatch(imageUpload(data));
	};

	return (
		<>
			<Button className="me-2 mb-2" onClick={() => handleShow("md-down")}>
				Manage Profile
			</Button>
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Manage Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="profile-img-upload-container">
						<label className="img-upload-label extra-extra-small-container">
							Choose an image...
							<input
								className="img-upload-input"
								type="file"
								accept="image/"
								onChange={(event) => setImage(event.target.files[0])}
							/>
						</label>
						<button
							className="upload-button extra-extra-small-container"
							onClick={handleImageUpload}
						>
							Upload
						</button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ManageProfileModal;
