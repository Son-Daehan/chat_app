import ChatFrame from "../components/ChatFrame";
import "./homepage.css";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
	handleDisplayOrganizationSettings,
	retrieveOrganization,
	retrieveOrganizationChannels,
} from "../redux/reducers/OrganizationSlice";
import Organization from "../components/Organization";
import OrganizationChannel from "../components/OrganizationChannel";
import Dropdown from "react-bootstrap/Dropdown";

const HomePage = () => {
	const { defaultOrganization } = useSelector((state) => state.organization);
	const { selectedChannelSocket } = useSelector((state) => state.channel);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(retrieveOrganization());
	}, []);

	useEffect(() => {
		if (defaultOrganization) {
			dispatch(retrieveOrganizationChannels(defaultOrganization.id));
		}
	}, [defaultOrganization]);

	return (
		<div className="homepage-container">
			<div className="homepage-left-wrapper">
				<div className="homepage-organization-container">
					<Dropdown>
						{/* <div className="homepage-organization-header-container"> */}
						{defaultOrganization ? (
							<Dropdown.Toggle
								variant="none"
								// className="d-inline"
								// id="dropdown-basic"
								style={{
									color: "white",
									justifyContent: "left",
								}}
							>
								<h3>{defaultOrganization.organization.organization_name}</h3>
							</Dropdown.Toggle>
						) : (
							<h1>Select an Organization</h1>
						)}
						{/* </div> */}
						<hr />
						<Dropdown.Menu variant="dark">
							<Organization />
						</Dropdown.Menu>
					</Dropdown>
					<div>
						<OrganizationChannel />
						{/* <h4>Organization Channels</h4>
						{defaultOrganizationChannels &&
							defaultOrganizationChannels.map((channel) => (
								<div>
									<ChatChannel channelName={channel.channel_name} />
								</div>
							))} */}
					</div>
				</div>
				<div>
					<Navbar />
				</div>
			</div>
			<div className="homepage-middle-wrapper">
				{selectedChannelSocket && <ChatFrame />}
			</div>
			<div className="homepage-right-wrapper"></div>
		</div>
	);
};

export default HomePage;
