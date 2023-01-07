import { useDispatch, useSelector } from "react-redux";
import {
	retrieveOrganizationUsers,
	setDefaultOrganization,
} from "../../redux/reducers/OrganizationSlice";
import CreateOrganizationChannelModal from "./modal/CreateOrganizationChannelModal";
import CreateOrganizationModal from "./modal/CreateOrganizationModal";
import OrganizationAddUserModal from "./modal/OrganizationAddUserModal";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect } from "react";

const Organization = () => {
	const { organizations, defaultOrganization, displayOrganizationSettings } =
		useSelector((state) => state.organization);

	const dispatch = useDispatch();

	const handleSetDefaultOrganization = (organization) => {
		dispatch(setDefaultOrganization(organization));
	};

	useEffect(() => {
		if (defaultOrganization) {
			dispatch(retrieveOrganizationUsers(defaultOrganization.id));
		}
	}, [defaultOrganization]);

	return (
		<>
			{organizations &&
				organizations.map((organization) => {
					return (
						<Dropdown.Item
							onClick={() => {
								handleSetDefaultOrganization(organization);
							}}
						>
							{organization.organization.organization_name}
						</Dropdown.Item>
					);
				})}
			<hr />
			{defaultOrganization && (
				<div>
					<Dropdown.Item>
						<OrganizationAddUserModal
							selectedOrganizationID={defaultOrganization.id}
						/>
					</Dropdown.Item>
					<Dropdown.Item>
						<CreateOrganizationChannelModal
							selectedOrganizationID={defaultOrganization.id}
						/>
					</Dropdown.Item>
				</div>
			)}
			<Dropdown.Item>
				<CreateOrganizationModal />
			</Dropdown.Item>
		</>
	);
};

export default Organization;
