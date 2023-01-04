import ChatFrame from "../components/ChatFrame";
import "./homepage.css";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import OrganizationChannelCreate from "../components/OrganizationChannelCreate";
import { useDispatch, useSelector } from "react-redux";
import {
	handleDisplayOrganizationSettings,
	retrieveOrganization,
	retrieveOrganizationChannels,
} from "../redux/reducers/OrganizationSlice";
import Organization from "../components/Organization";
import OrganizationChannel from "../components/OrganizationChannel";

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
					<Navbar />
					<div>
						<div
							className="organization-header-container"
							onClick={() => dispatch(handleDisplayOrganizationSettings())}
						>
							{defaultOrganization ? (
								<div>
									<h1>{defaultOrganization.organization.organization_name}</h1>
									<OrganizationChannelCreate
										selectedOrganizationID={defaultOrganization.id}
									/>
								</div>
							) : (
								<h1>Select an Organization</h1>
							)}
						</div>
						<div>
							<Organization />
						</div>
					</div>
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
			</div>
			<div className="homepage-middle-wrapper">
				<div>{selectedChannelSocket && <ChatFrame />}</div>
			</div>
			<div className="homepage-right-wrapper"></div>
		</div>
	);
};

export default HomePage;
