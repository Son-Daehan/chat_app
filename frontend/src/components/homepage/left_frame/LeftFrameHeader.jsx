import { useDispatch, useSelector } from "react-redux";
import {
	retrieveOrganization,
	retrieveOrganizationUsers,
	setDefaultOrganization,
} from "../../../redux/reducers/OrganizationSlice";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect } from "react";
import Organization from "../../organization/Organization";

const LeftFrameHeader = () => {
	const { defaultOrganization, organizations } = useSelector(
		(state) => state.organization
	);
	const dispatch = useDispatch();

	useEffect(() => {
		// if (authenticated) {
		dispatch(retrieveOrganization());
		// }
	}, []);

	useEffect(() => {
		if (!defaultOrganization) {
			try {
				// sets default to first organization - change later to be based on stored data in localstorage
				dispatch(setDefaultOrganization(organizations[0]));
			} catch {
				dispatch(setDefaultOrganization(null));
			}
		}
	}, [defaultOrganization]);

	return (
		<div className="homepage-left-frame-header-container homepage-header-container">
			<Dropdown>
				<Dropdown.Toggle
					variant="none"
					// className="d-inline"
					// id="dropdown-basic"
					className="organization-dropdown-toggle"
				>
					<h3>
						{defaultOrganization
							? defaultOrganization.organization.organization_name
							: "Create Organization"}
					</h3>
				</Dropdown.Toggle>
				<Dropdown.Menu variant="dark">
					<Organization />
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default LeftFrameHeader;
