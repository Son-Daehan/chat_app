import { useDispatch, useSelector } from "react-redux";
import {
	retrieveOrganization,
	setDefaultOrganization,
} from "../../../redux/reducers/OrganizationSlice";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect } from "react";
import Organization from "../../organization/Organization";

const LeftFrameHeader = () => {
	const { defaultOrganization, organizations } = useSelector(
		(state) => state.organization
	);
	const { authenticated } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (authenticated) {
			dispatch(retrieveOrganization());
		}
	}, [authenticated]);

	// sets the defaultOrganization to either persisted data in local storage or the first organization in retreived from the list
	useEffect(() => {
		if (!defaultOrganization) {
			try {
				// sets default to first organization - change later to be based on stored data in localstorage, authslice is clearing localstorage so it's not working

				dispatch(setDefaultOrganization(organizations[0]));
			} catch {
				// dispatch(setDefaultOrganization(null));
				localStorage.removeItem("defaultOrganization");
			}
		}
	}, [organizations]);

	return (
		<div className="homepage-left-frame-header-container homepage-header-container">
			<Dropdown>
				<Dropdown.Toggle
					variant="none"
					className="organization-dropdown-toggle"
				>
					<h3>
						{defaultOrganization
							? defaultOrganization.organization_name
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
